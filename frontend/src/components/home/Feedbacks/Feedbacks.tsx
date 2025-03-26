import { HiMiniArrowUpRight } from "react-icons/hi2";
import user from "../../../assets/feedbacks/user.png";
import css from "./Feedbacks.module.css";
import { Link } from "react-router-dom";

export default function Feedbacks() {
  return (
    <>
      <div className={css.container}>
        <div className={css.gradient}>
          <Link target="blank" to="https://www.instagram.com/stories/highlights/18137333335113644/" className={css.link}>
            Всі відгуки <HiMiniArrowUpRight className={css.arrow} />
          </Link>
        </div>
        <ul className={css.list}>
          <li className={css.item}>
            <p className={css.text}>
              Чесно кажучи, дізнавшись про спартанські умови в таборі, були
              деякі побоювання, що дівчата не витримають і будуть проситися
              додому. Та завдяки правильній мотивації і організації таборового
              процесу, вони навпаки були в захваті від вражень. Гутірки з
              історії та домедичної допомоги, навички виживання в лісі і ще
              багато іншого розширили кругозір моїх доньок. Завдяки табору
              дівчата стали витривалими, самостійними і вирішили продовжувати
              свою діяльність вже як члени організації.
            </p>
            <div className={css.row}>
              <div className={css.col}>
                <img src={user} alt="Портрет" className={css.image} />
              </div>
              <div className={css.col}>
                <p className={css.name}>Сергій Гусєв</p>
                <p className={css.description}>
                  Батько подруги Катани та Гусьмін
                </p>
              </div>
            </div>
          </li>
          <li className={css.item}>
            <p className={css.text}>
              Її перша зміна на таборі була цікавою, складною, емоційною,
              випробувальною. Не передати мій подив, коли на половині моєї
              дороги до Черкас вона подзвонила і сказала, що хоче залишитися ще
              на одну зміну! Друга зміна, під час якої моя Волинь стала ройовою,
              ще більше зміцнила її і загартувала характер. Систематизувався в
              її поглядах національний дух, поглибилися знання з історії країни.
              Вона з надзвичайним трепетом читала одразу придбану після табору
              книгу «Холодний Яр».
            </p>
            <div className={css.row}>
              <div className={css.col}>
                <img src={user} alt="Портрет" className={css.image} />
              </div>
              <div className={css.col}>
                <p className={css.name}>Надія Замрига</p>
                <p className={css.description}>Мама подруги Волинь</p>
              </div>
            </div>
          </li>
          <li className={css.item}>
            <p className={css.text}>
            За старших синів я не переживала, що їм там сподобається. Проте з молодшими були сумніви. Втім табір «зайшов» усім!
<br />І це не дивно. Це місце, де їх розуміють. Це місце, де їх виховують, дисциплінують. Разом з цим, їхні думки поважають, а до них ставляться, як до особистостей. Батькам важливо, коли старші товариші ставляться до підлітка, як до рівного. Виховники «Поклику Яру» не перестають тримати зв'язок з вихованцями табору й протягом року. Тому у дітей там є справжні друзі. А це багато чого вартує!
            </p>
            <div className={css.row}>
              <div className={css.col}>
                <img src={user} alt="Портрет" className={css.image} />
              </div>
              <div className={css.col}>
                <p className={css.name}>Руслана Чевірова</p>
                <p className={css.description}>
                  Мама друга Лінгвіста, Ємо, Шрека
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
