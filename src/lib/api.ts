const MARKET_WORKER = "https://date-time-market.iamfineder.workers.dev";
const CHAT_WORKER = "https://date-time-chat.iamfineder.workers.dev";
const WEATHER_LAT = "17.29494";
const WEATHER_LON = "103.97192";

export const API = {
  weather: {
    current: `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia/Bangkok`,
    forecast: `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Bangkok&forecast_days=7`,
  },
  market: {
    products: MARKET_WORKER,
    sold: MARKET_WORKER,
  },
  reports: {
    list: `${MARKET_WORKER}/reports`,
    create: `${MARKET_WORKER}/report`,
    status: `${MARKET_WORKER}/report/status`,
  },
  poll: {
    get: `${MARKET_WORKER}/poll`,
    vote: `${MARKET_WORKER}/poll/vote`,
  },
  chat: CHAT_WORKER,
};

export const MODEL_NAME = "pathumma-thaillm-qwen3-8b-think-3.0.0";
