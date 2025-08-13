import css from "./Hero.module.css";
import ButtonCTA from "../../shared/ButtonCTA/ButtonCTA";

export default function Hero() {
  return (
    <>
      <div className={css.container}>
        <div className={css.bgFilter}></div>
        <div className={css.content}>
          <h1 className={css.title}>
            РУХ <span>"Поклик Яру"</span>
          </h1>
          <h2 className={css.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            congue pharetra pretium. Integer pellentesque diam nec lorem
          </h2>
          <div className={css.buttonWrapper}>
            <ButtonCTA
              target="blank"
              link="https://docs.google.com/forms/d/1RjXHBQWtLBUeMnhjEnP997u83JKJ9wmPg8ss4cNN5jI/viewform?edit_requested=true"
            >
              Доєднатись до руху
            </ButtonCTA>
          </div>
        </div>
      </div>
    </>
  );
}
