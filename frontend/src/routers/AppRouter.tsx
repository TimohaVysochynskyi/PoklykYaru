import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const DonatePage = lazy(() => import("../pages/DonatePage/DonatePage"));
const EventPage = lazy(() => import("../pages/EventPage/EventPage"));

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/events" element={<EventPage />} />
      </Routes>
    </>
  );
}
