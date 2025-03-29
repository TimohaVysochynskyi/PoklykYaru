import { Link, Outlet } from "react-router-dom";
import EventTop from "../../components/event/EventTop/EventTop";
import css from "./TabirPage.module.css";
import { BiLeftArrowAlt } from "react-icons/bi";
import Footer from "../../components/shared/Footer/Footer";

type Props = {
    activePage: string;
}

export default function EventPage({activePage}: Props) {
  return (
    <>
      <section className={css.topContainer}>
        <Link to="/events" className={css.backLink}>
          <BiLeftArrowAlt className={css.icon} />
          Повернутись
        </Link>
        <EventTop active={activePage} />

        <Outlet></Outlet>
      </section>

      <Footer />
    </>
  );
}
