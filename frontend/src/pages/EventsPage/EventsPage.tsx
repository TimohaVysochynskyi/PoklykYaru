import EventTop from "../../components/event/EventTop/EventTop";
import EventTitleWrapper from "../../components/event/EventTitleWrapper/EventTitleWrapper";
import EventGallery from "../../components/event/EventGallery/EventGallery";
import css from "./EventsPage.module.css";
import Footer from "../../components/shared/Footer/Footer";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { fetchAllEvents } from "../../services/events";
import { EventType } from "../../types/Event.types";
import Loader from "../../components/shared/Loader/Loader";

export default function EventsPage() {
  const currentPageArray = useLocation()
    .pathname.split("/")
    .filter((path) => path.length > 0);
  const [currentPage, setCurrentPage] = useState("events");
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);

  useEffect(() => {
    setCurrentPage(currentPageArray[currentPageArray.length - 1]);
  }, [currentPageArray]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchAllEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    if (currentPage !== "events" && events.length > 0) {
      const event = events.find((e) => e.path === currentPage);
      setCurrentEvent(event || null);
    } else {
      setCurrentEvent(null);
    }
  }, [currentPage, events]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="80" />
      </div>
    );
  }

  return (
    <>
      <section className={css.topContainer}>
        {currentPage !== "events" && (
          <>
            <Link to="/events" className={css.backLink}>
              <BiLeftArrowAlt className={css.icon} />
              Повернутись
            </Link>
          </>
        )}

        <EventTop active={currentPage} events={events} />
        {currentPage === "events" && <EventTitleWrapper />}

        <Outlet />
      </section>

      <EventGallery
        event={currentEvent}
        isMainPage={currentPage === "events"}
      />

      <Footer />
    </>
  );
}
