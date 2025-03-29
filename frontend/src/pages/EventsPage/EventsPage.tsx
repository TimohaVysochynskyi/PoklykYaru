import EventTop from "../../components/event/EventTop/EventTop";
import EventTitleWrapper from "../../components/event/EventTitleWrapper/EventTitleWrapper";
import EventGallery from "../../components/event/EventGallery/EventGallery";
import css from "./EventsPage.module.css";
import Footer from "../../components/shared/Footer/Footer";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";


export default function EventsPage() {
  const currentPageArray = useLocation().pathname.split("/").filter((path)=> path.length > 0);
  const [currentPage, setCurrentPage] = useState("events");

  useEffect(() => {
    setCurrentPage(currentPageArray[currentPageArray.length - 1]);
  }, [currentPageArray]);

  return (
    <>
      <section className={css.topContainer}>
        {currentPage !== "events" &&
          <>
            <Link to="/events" className={css.backLink}>
              <BiLeftArrowAlt className={css.icon} />
              Повернутись
            </Link>
          </>
        }
        
        <EventTop active={currentPage} />
        {currentPage == "events" && <EventTitleWrapper />}

        <Outlet />
      </section>

      <EventGallery folder={currentPage} />

      <Footer />
    </>
  );
}
