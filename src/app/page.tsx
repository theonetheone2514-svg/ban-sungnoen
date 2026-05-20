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
      <DateTimeSection />
      <WeatherSection />
      <MarketSection />
      <ReportSection />
      <MapSection />
      <PollSection />
      <ChatBot />
    </>
  );
}
