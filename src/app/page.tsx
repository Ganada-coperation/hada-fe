"use client";

import LandingPage from "./landing/components/LandingPage";
import HomePage from "./pageSection/HomePage";
import AppLayout from "@components/layout/AppLayout";

export default function Page() {
  return (
    <AppLayout>
      <div id="landing">
        <LandingPage />
      </div>
      <div id="start">
        <HomePage />
      </div>
    </AppLayout>
  );
}
