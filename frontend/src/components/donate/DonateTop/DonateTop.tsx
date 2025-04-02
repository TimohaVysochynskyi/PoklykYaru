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
          <a
            target="blank"
            href="https://next.privat24.ua/send/2v7yn"
            className={css.qrWrapper}
          >
            <p className={css.qrText}>Приват банк</p>
            <img src={qrPrivat} alt="QR-код" className={css.qr} />
          </a>
          <a
            target="blank"
            href="https://send.monobank.ua/8QAtg2DpVr"
            className={css.qrWrapper}
          >
            <p className={css.qrText}>Монобанк</p>
            <img src={qrMono} alt="QR-код" className={css.qr} />
          </a>
        </div>
      </div>
    </>
  );
}
