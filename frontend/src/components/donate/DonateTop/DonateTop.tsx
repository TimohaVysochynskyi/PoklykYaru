import qrPrivat from "../../../assets/donate/qr-privat.png";
import qrMono from "../../../assets/donate/qr-mono.png";
import css from "./DonateTop.module.css";

export default function DonateTop() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>
          підтримати
          <span className={css.subtitle}>нас</span>
        </p>
        <div className={css.qrList}>
          <a href="" className={css.qrWrapper}>
            <p className={css.qrText}>Приват банк</p>
            <img src={qrPrivat} alt="QR-код" className={css.qr} />
          </a>
          <a href="" className={css.qrWrapper}>
            <p className={css.qrText}>Монобанк</p>
            <img src={qrMono} alt="QR-код" className={css.qr} />
          </a>
          <div className={css.qrWrapper}>
            <a
              href="https://base.monobank.ua/27nRdVToxGcBps#subscriptions"
              className={css.link}
            >
              Інший спосіб...
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
