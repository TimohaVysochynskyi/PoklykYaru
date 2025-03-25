import Hero from "../../components/home/Hero/Hero";
import Values from "../../components/home/Values/Values";
// import Map from "../../components/home/Map/Map";
import PoklykIs from "../../components/home/PoklykIs/PoklykIs";
import FeedbacksWrapper from "../../components/home/FeedbacksWrapper/FeedbacksWrapper";
import Footer from "../../components/shared/Footer/Footer";

// import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Values />
      {/* <Map /> */}
      <PoklykIs />
      <FeedbacksWrapper />
      <Footer />
    </>
  );
}
