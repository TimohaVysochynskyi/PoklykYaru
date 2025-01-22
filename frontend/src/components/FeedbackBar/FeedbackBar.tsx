import { HiSpeakerphone } from "react-icons/hi";
import css from "./FeedbackBar.module.css";

export default function FeedbackBar() {
  return (
    <>
      <div className={css.container}>
        <div className={css.titleWrapper}>
          <HiSpeakerphone className={css.icon} />
          <h3 className={css.title}>Хочете залишити відгук? </h3>
        </div>
        <a href="#" className={css.button}>
          Перейти на Гугл-форму
        </a>
      </div>
    </>
  );
}
