import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const DonatePage = lazy(() => import("../pages/DonatePage/DonatePage"));
const MovementPage = lazy(() => import("../pages/MovementPage/MovementPage"));
const EventsPage = lazy(() => import("../pages/EventsPage/EventsPage"));
const EventContent = lazy(
  () => import("../components/event/EventContent/EventContent")
);

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/movement" element={<MovementPage />} />
        <Route path="/events" element={<EventsPage />}>
          <Route path=":eventPath" element={<EventContent />} />
        </Route>
      </Routes>
    </>
  );
}
