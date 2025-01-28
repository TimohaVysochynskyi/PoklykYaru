import AboutTop from "../../components/about/AboutTop/AboutTop";
import AboutList from "../../components/about/AboutList/AboutList";
import AboutContacts from "../../components/about/AboutContacts/AboutContacts";
import Footer from "../../components/shared/Footer/Footer";

import css from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <>
      <div className={css.container}>
        <AboutTop />
        <AboutList />
        <AboutContacts />
      </div>
      <Footer />
    </>
  );
}
