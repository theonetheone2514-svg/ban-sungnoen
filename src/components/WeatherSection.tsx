"use client";

import { useEffect } from "react";
import { useWeather } from "@/hooks/useWeather";

export default function WeatherSection() {
  const { data, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <section
      id="weather-section"
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-5 border border-white/10 shadow-lg animate-fadeIn"
    >
      <div className="mb-5">
        <h2 className="text-[#667eea] text-xl font-bold mb-4 flex items-center gap-2">
          🌤️ สภาพอากาศ
        </h2>
        <div className="text-base text-text-primary my-2">
          {data?.weatherText || "⏳ กำลังโหลด..."}
        </div>
        {data?.temp !== null && (
          <div className="flex gap-5 mt-2">
            <span className="text-xl text-cyan font-semibold">
              🌡️ {data?.temp}°C
            </span>
            <span className="text-lg text-text-secondary">
              💧 {data?.humid}%
            </span>
          </div>
        )}
      </div>

      {data?.forecast && data.forecast.length > 0 && (
        <div>
          <h3 className="text-[#764ba2] text-lg font-bold mb-4">
            📅 พยากรณ์อากาศ 7 วัน
          </h3>
          <div className="flex gap-2.5 overflow-x-auto pb-2.5">
            {data.forecast.map((day, i) => (
              <div
                key={i}
                className="bg-bg-card p-4 rounded-xl text-center min-w-[75px] border border-border shrink-0 hover:-translate-y-1 hover:border-[#667eea] hover:shadow-[0_0_20px_rgba(102,126,234,0.3)] transition-all duration-300"
              >
                <div className="font-semibold text-text-primary mb-2 text-sm">
                  {day.dayName}
                </div>
                <div className="text-2xl my-2">{day.icon}</div>
                <div className="text-sm text-text-secondary">
                  {day.tempMax}° / {day.tempMin}°
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
