"use client";

import { useEffect } from "react";
import { CloudSun, Thermometer, Droplets } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";

export default function WeatherSection() {
  const { data, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <section
      id="weather-section"
      className="bg-[var(--bg-section)] backdrop-blur-xl rounded-2xl p-6 border border-[var(--border)] shadow-[var(--shadow)] animate-fadeIn stagger-2 card-3d"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--accent-1)] flex items-center justify-center">
          <CloudSun size={20} className="text-white" />
        </div>
        <h2 className="text-lg font-bold gradient-text">สภาพอากาศ</h2>
      </div>

      {!data ? (
        <div className="space-y-3">
          <div className="h-5 bg-[var(--bg-card)] rounded skeleton-pulse" />
          <div className="flex gap-4">
            <div className="h-8 w-24 bg-[var(--bg-card)] rounded skeleton-pulse" />
            <div className="h-8 w-20 bg-[var(--bg-card)] rounded skeleton-pulse" />
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-2.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-28 w-[75px] bg-[var(--bg-card)] rounded-xl shrink-0 skeleton-pulse" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <div className="flex items-center gap-3 p-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
              <CloudSun size={20} className="text-[var(--cyan)]" />
              <span className="text-sm text-[var(--text-primary)]">{data.weatherText}</span>
            </div>
            {data.temp !== null && (
              <>
                <div className="flex items-center gap-2 p-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                  <Thermometer size={18} className="text-[var(--accent-1)]" />
                  <span className="text-lg font-bold text-[var(--cyan)]">{data.temp}°C</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                  <Droplets size={18} className="text-[var(--accent-2)]" />
                  <span className="text-sm text-[var(--text-secondary)]">{data.humid}%</span>
                </div>
              </>
            )}
          </div>

          {data.forecast.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">
                พยากรณ์ 7 วัน
              </h3>
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                {data.forecast.map((day, i) => (
                  <div
                    key={i}
                    className="bg-[var(--bg-card)] backdrop-blur-md p-4 rounded-xl text-center min-w-[80px] border border-[var(--border)] shrink-0 card-3d"
                  >
                    <div className="font-semibold text-xs text-[var(--text-primary)] mb-2">{day.dayName}</div>
                    <div className="text-xl my-2">{day.icon}</div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-1)]">{day.tempMax}°</span> / <span className="text-[var(--cyan)]">{day.tempMin}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
