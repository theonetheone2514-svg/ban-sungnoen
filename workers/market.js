export default {
  async fetch(request, env, ctx) {
    const CORS_HEADERS = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (request.method === 'POST' && path === '/sell') {
        return handleSell(request, env, CORS_HEADERS);
      }
      if (request.method === 'POST' && path === '/report') {
        return handleReportCreate(request, env, CORS_HEADERS);
      }
      if (request.method === 'POST' && path === '/report/status') {
        return handleReportStatus(request, env, CORS_HEADERS);
      }
      if (request.method === 'GET' && path === '/reports') {
        return handleReportsList(env, CORS_HEADERS);
      }
      if (request.method === 'GET' && path === '/poll') {
        return handlePollGet(env, CORS_HEADERS);
      }
      if (request.method === 'POST' && path === '/poll/vote') {
        return handlePollVote(request, env, CORS_HEADERS);
      }

      // GET / → สินค้าทั้งหมด
      return handleProducts(env, CORS_HEADERS);
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }
  }
};

async function handleProducts(env, CORS_HEADERS) {
  try {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ57i7aRNeXRop-ZeE7DjQI5NfnJ-v9e8lzk3CX9eVVoQ65XxSrBTfyhqPkSDHFifSrorZeDtyXqr-l/pub?gid=358175687&single=true&output=csv';

    const response = await fetch(sheetUrl);
    const csvData = await response.text();

    let products = parseGoogleSheetCsv(csvData);

    try {
      const soldIds = JSON.parse(await env.SOLD_PRODUCTS.get('sold:list') || '[]');
      const soldSet = new Set(soldIds);
      products = products.filter(p => !soldSet.has(p.id));
    } catch (e) {}

    return new Response(JSON.stringify({
      success: true,
      products: products,
      count: products.length
    }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      products: getDefaultProducts()
    }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}

async function handleSell(request, env, CORS_HEADERS) {
  try {
    if (!env?.SOLD_PRODUCTS) {
      return new Response(JSON.stringify({ error: 'ยังไม่ได้ตั้งค่า KV binding' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }
    const { id } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    const list = JSON.parse(await env.SOLD_PRODUCTS.get('sold:list') || '[]');
    if (!list.includes(id)) {
      list.push(id);
    }
    await env.SOLD_PRODUCTS.put('sold:list', JSON.stringify(list));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}

async function handleReportCreate(request, env, CORS_HEADERS) {
  try {
    if (!env?.SOLD_PRODUCTS) {
      return new Response(JSON.stringify({ error: 'KV not ready' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }
    const { type, detail, contact, image } = await request.json();
    if (!type || !detail) {
      return new Response(JSON.stringify({ error: 'Missing type or detail' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    const now = new Date();
    const report = {
      id: now.toISOString(),
      type,
      detail,
      contact: contact || '',
      date: now.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'pending'
    };
    if (image && typeof image === 'string' && image.startsWith('data:image')) {
      report.image = image;
    }

    const list = JSON.parse(await env.SOLD_PRODUCTS.get('reports:list') || '[]');
    list.unshift(report);
    await env.SOLD_PRODUCTS.put('reports:list', JSON.stringify(list));

    return new Response(JSON.stringify({ success: true, report }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}

async function handleReportsList(env, CORS_HEADERS) {
  try {
    const list = JSON.parse(await env.SOLD_PRODUCTS.get('reports:list') || '[]');
    return new Response(JSON.stringify({ success: true, reports: list, count: list.length }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message, reports: [] }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}

async function handleReportStatus(request, env, CORS_HEADERS) {
  try {
    if (!env?.SOLD_PRODUCTS) {
      return new Response(JSON.stringify({ error: 'KV not ready' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }
    const { id } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    const list = JSON.parse(await env.SOLD_PRODUCTS.get('reports:list') || '[]');
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) {
      return new Response(JSON.stringify({ error: 'Report not found' }), {
        status: 404,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    const statusMap = { 'pending': 'in_progress', 'in_progress': 'done', 'done': 'done' };
    list[idx].status = statusMap[list[idx].status] || 'done';
    await env.SOLD_PRODUCTS.put('reports:list', JSON.stringify(list));

    return new Response(JSON.stringify({ success: true, report: list[idx] }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}

const DEFAULT_POLL = {
  question: 'อยากให้ปรับปรุงอะไรในหมู่บ้าน?',
  options: { ถนน: 0, ไฟฟ้า: 0, ประปา: 0, ขยะ: 0, อื่นๆ: 0 }
};

async function handlePollGet(env, CORS_HEADERS) {
  try {
    const poll = JSON.parse(await env.SOLD_PRODUCTS.get('poll') || JSON.stringify(DEFAULT_POLL));
    const total = Object.values(poll.options).reduce((a, b) => a + b, 0);
    return new Response(JSON.stringify({ success: true, ...poll, total }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: true, ...DEFAULT_POLL, total: 0 }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}

async function handlePollVote(request, env, CORS_HEADERS) {
  try {
    const { option } = await request.json();
    if (!option) {
      return new Response(JSON.stringify({ error: 'Missing option' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }
    let poll = JSON.parse(await env.SOLD_PRODUCTS.get('poll') || JSON.stringify(DEFAULT_POLL));
    if (poll.options[option] === undefined) {
      poll.options[option] = 0;
    }
    poll.options[option]++;
    await env.SOLD_PRODUCTS.put('poll', JSON.stringify(poll));
    const total = Object.values(poll.options).reduce((a, b) => a + b, 0);
    return new Response(JSON.stringify({ success: true, ...poll, total }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.replace(/^"|"$/g, '').trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.replace(/^"|"$/g, '').trim());
  return result;
}

function parseGoogleSheetCsv(csvText) {
  const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
  if (lines.length < 2) return getDefaultProducts();

  const products = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    if (values.length >= 6) {
      const timestamp = values[0];
      const name = values[1];
      const category = values[2];
      const price = values[3];
      const unit = values[4];
      const lineId = values[5];
      const details = values[6] || '';

      if (name) {
        products.push({
          id: timestamp,
          'ชื่อสินค้า': name,
          'หมวดหมู่': category || 'อื่นๆ',
          'ราคา': price || 'ติดต่อผู้ขาย',
          'หน่วย': unit || '',
          'LINE ID': lineId || '',
          'รายละเอียด': details
        });
      }
    }
  }

  return products.length > 0 ? products : getDefaultProducts();
}

function getDefaultProducts() {
  return [
    { id: 'default-1', 'ชื่อสินค้า': 'ข้าวหอมมะลิ', 'หมวดหมู่': 'ข้าว', 'ราคา': '80', 'หน่วย': 'กิโลกรัม', 'LINE ID': '', 'รายละเอียด': 'ข้าวหอมมะลิอินทรีย์' },
    { id: 'default-2', 'ชื่อสินค้า': 'กล้วยหอม', 'หมวดหมู่': 'ผลไม้', 'ราคา': '30', 'หน่วย': 'กิโลกรัม', 'LINE ID': '', 'รายละเอียด': 'กล้วยหอมสุก' },
    { id: 'default-3', 'ชื่อสินค้า': 'ตะไคร้สด', 'หมวดหมู่': 'ผัก', 'ราคา': '20', 'หน่วย': 'กำ', 'LINE ID': '', 'รายละเอียด': 'ตะไคร้หอมสดจากสวน' }
  ];
}
