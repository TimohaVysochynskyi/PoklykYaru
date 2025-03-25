import { HiMiniArrowUpRight } from "react-icons/hi2";
import user from "../../../assets/feedbacks/user.png";
import css from "./Feedbacks.module.css";
import { Link } from "react-router-dom";

export default function Feedbacks() {
  return (
    <>
      <div className={css.container}>
        <div className={css.gradient}>
          <Link to="/feedbacks" className={css.link}>
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
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Officiis ex iste earum excepturi dolore ipsa totam fugiat iure
              possimus, repudiandae voluptas soluta blanditiis inventore error
              enim est eveniet labore atque?"
            </p>
            <div className={css.row}>
              <div className={css.col}>
                <img src={user} alt="Портрет" className={css.image} />
              </div>
              <div className={css.col}>
                <p className={css.name}>Друг Фестиваль</p>
                <p className={css.description}>
                  Координатор організації "Поклик Яру"
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
