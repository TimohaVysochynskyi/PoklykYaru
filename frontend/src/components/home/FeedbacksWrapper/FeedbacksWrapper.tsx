import Feedbacks from "../Feedbacks/Feedbacks";
import css from "./FeedbacksWrapper.module.css";

export default function FeedbacksWrapper() {
  return (
    <>
      <div className={css.container}>
        <div className={css.row}>
          <div className={css.col}>
            <div className={css.bgLayer}></div>
            <div className={css.titleWrapper}>
              <p className={css.title}>
                Відгуки <br />
                <span className={css.subtitle}>вихованців</span>
                <br className={css.titleBR} />
                <span className={css.subtitle}>та батьків</span>
              </p>
            </div>
          </div>
          <div className={css.col}>
            <Feedbacks />
          </div>
        </div>
      </div>
    </>
  );
}
