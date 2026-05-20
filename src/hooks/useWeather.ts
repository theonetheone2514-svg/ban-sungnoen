"use client";

import { useState, useCallback } from "react";
import { API } from "@/lib/api";
import { getWeatherText, getWeatherEmoji } from "@/lib/utils";

export interface ForecastDay {
  dayName: string;
  icon: string;
  tempMax: number;
  tempMin: number;
}

export interface WeatherData {
  weatherText: string;
  temp: number | null;
  humid: number | null;
  forecast: ForecastDay[];
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const [currentRes, forecastRes] = await Promise.all([
        fetch(API.weather.current),
        fetch(API.weather.forecast),
      ]);
      const current = await currentRes.json();
      const forecast = await forecastRes.json();

      const temp = current.current?.temperature_2m ?? null;
      const humid = current.current?.relative_humidity_2m ?? null;
      const code = current.current?.weather_code ?? 0;
      const weatherText = `${getWeatherText(code)}${temp !== null ? ` อุณหภูมิ ${temp}°C ความชื้น ${humid}%` : ""}`;

      const days = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
      const forecastData: ForecastDay[] = forecast.daily
        ? forecast.daily.time.map((t: string, i: number) => ({
            dayName: i === 0 ? "วันนี้" : days[new Date(t).getDay()],
            icon: getWeatherEmoji(forecast.daily.weather_code[i]),
            tempMax: Math.round(forecast.daily.temperature_2m_max[i]),
            tempMin: Math.round(forecast.daily.temperature_2m_min[i]),
          }))
        : [];

      setData({ weatherText, temp, humid, forecast: forecastData });
    } catch {
      setData({
        weatherText: "ไม่สามารถดึงข้อมูลสภาพอากาศได้",
        temp: null, humid: null, forecast: [],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetchWeather };
}
