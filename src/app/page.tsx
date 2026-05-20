"use client";

import { useCallback } from "react";
import Header from "@/components/Header";
import NavAnchors from "@/components/NavAnchors";
import DateTimeSection from "@/components/DateTimeSection";
import WeatherSection from "@/components/WeatherSection";
import MarketSection from "@/components/MarketSection";
import ReportSection from "@/components/ReportSection";
import MapSection from "@/components/MapSection";
import PollSection from "@/components/PollSection";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <>
      <Header onRefresh={handleRefresh} />
      <NavAnchors />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <DateTimeSection />
        <WeatherSection />
      </div>

      <MarketSection />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <ReportSection />
        <div>
          <MapSection />
          <PollSection />
        </div>
      </div>

      <ChatBot />
    </>
  );
}
