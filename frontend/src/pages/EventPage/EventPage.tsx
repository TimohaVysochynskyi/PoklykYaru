import EventTop from "../../components/event/EventTop/EventTop";
import EventTitleWrapper from "../../components/event/EventTitleWrapper/EventTitleWrapper";
import EventGallery from "../../components/event/EventGallery/EventGallery";
import css from "./EventPage.module.css";
import Footer from "../../components/shared/Footer/Footer";

export default function EventPage() {
  return (
    <>
      <section className={css.topContainer}>
        <EventTop />
        <EventTitleWrapper />
      </section>
      <EventGallery />

      <Footer />
    </>
  );
}
