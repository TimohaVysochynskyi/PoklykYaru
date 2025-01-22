import FeedbackBar from "../FeedbackBar/FeedbackBar";
import Feedbacks from "../Feedbacks/Feedbacks";
import css from "./FeedbacksWrapper.module.css";

export default function FeedbacksWrapper() {
  return (
    <>
      <div className={css.container}>
        <div className={css.row}>
          <div className={css.col}>
            <div className={css.titleWrapper}>
              <p className={css.title}>Відгуки</p>
              <p className={css.subtitle}>вихованців та</p>
              <p className={css.subtitle}>їх батьків</p>
            </div>
          </div>
          <div className={css.col}>
            <Feedbacks />
          </div>
        </div>
        <FeedbackBar />
      </div>
    </>
  );
}
