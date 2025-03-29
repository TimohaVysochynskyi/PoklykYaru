import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const DonatePage = lazy(() => import("../pages/DonatePage/DonatePage"));
const MovementPage = lazy(() => import("../pages/MovementPage/MovementPage"));
const EventsPage = lazy(() => import("../pages/EventsPage/EventsPage"));

const TabirWrapper = lazy(()=>import("../components/event/tabir/TabirWrapper/TabirWrapper"))
const PokrovaWrapper = lazy(()=>import("../components/event/pokrova/PokrovaWrapper/PokrovaWrapper"))

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/movement" element={<MovementPage />} />
        <Route path="/events" element={<EventsPage />}>
          <Route path="tabir" element={<TabirWrapper />} />
          <Route path="pohid" element={<TabirWrapper />} />
          <Route path="zmah" element={<TabirWrapper />} />
          <Route path="pokrova" element={<PokrovaWrapper />} />
        </Route>
      </Routes>
    </>
  );
}
