import DonateTop from "../../components/donate/DonateTop/DonateTop";
import DonateList from "../../components/donate/DonateList/DonateList";
import image from "../../assets/donate/image.webp";
import css from "./DonatePage.module.css";
import Footer from "../../components/shared/Footer/Footer";

export default function DonatePage() {
  return (
    <>
      <div className={css.container}>
        <DonateTop />
        <DonateList />
        <img
          src={image}
          alt="Фото на сторінці Підтримка"
          className={css.image}
        />
      </div>
      <Footer />
    </>
  );
}
