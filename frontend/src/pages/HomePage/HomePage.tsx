import Hero from "../../components/Hero/Hero";
import ValuesWrapper from "../../components/ValuesWrapper/ValuesWrapper";
import Map from "../../components/Map/Map";
import PoklykIs from "../../components/PoklykIs/PoklykIs";
import FeedbacksWrapper from "../../components/FeedbacksWrapper/FeedbacksWrapper";
import Footer from "../../components/Footer/Footer";

// import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuesWrapper />
      <Map />
      <PoklykIs />
      <FeedbacksWrapper />
      <Footer />
    </>
  );
}
