export default {
  async fetch(request, env, ctx) {
    const CORS_HEADERS = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // รองรับการตรวจสอบ CORS Preflight ของบราวเซอร์
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    try {
      const body = await request.json();
      const { messages, model, max_tokens, temperature } = body;

      // ดึง API Key จาก Environment Variable ของ Cloudflare (ถ้าไม่มีให้ใช้ค่าสำรองตัวเดิมที่คุณใส่มา)
      const apiKey = env.THAI_LLM_KEY || 'KRFViqRnXOqgm2jdQVSZLltEWhQ8TciG';

      const response = await fetch('http://thaillm.or.th/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model || 'pathumma-thaillm-qwen3-8b-think-3.0.0',
          messages,
          max_tokens: max_tokens || 2048,
          temperature: temperature || 0.3
        })
      });

      // ดักตรวจกรณี Server ต้นทางของ ThaiLLM มีปัญหา
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`ThaiLLM API Error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      
      return new Response(JSON.stringify(data), {
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
};