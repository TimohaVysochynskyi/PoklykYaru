import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MerchPage = lazy(() => import("../pages/MerchPage/MerchPage"));
const HelpPage = lazy(() => import("../pages/HelpPage/HelpPage"));
const EventPage = lazy(() => import("../pages/EventPage/EventPage"));

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/merch" element={<MerchPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/events" element={<EventPage />} />
      </Routes>
    </>
  );
}
