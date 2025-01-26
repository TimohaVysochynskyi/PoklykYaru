import { HiMiniArrowUpRight } from "react-icons/hi2";
import volyn from "../../../assets/feedbacks/volyn.png";
import fest from "../../../assets/feedbacks/fest.png";
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
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Officiis ex iste earum excepturi dolore ipsa totam fugiat iure
              possimus, repudiandae voluptas soluta blanditiis inventore error
              enim est eveniet labore atque? <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
              ex iste earum excepturi dolore ipsa totam fugiat iure possimus,
              repudiandae voluptas soluta blanditiis inventore error enim est
              eveniet labore atque?"
            </p>
            <div className={css.row}>
              <div className={css.col}>
                <img src={volyn} alt="Портрет" className={css.image} />
              </div>
              <div className={css.col}>
                <p className={css.name}>Подруга Волинь</p>
                <p className={css.description}>
                  Виховник організації "Поклик Яру"
                </p>
              </div>
            </div>
          </li>
          <li className={css.item}>
            <p className={css.text}>
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Officiis ex iste earum excepturi dolore ipsa totam fugiat iure
              possimus, repudiandae voluptas soluta blanditiis inventore error
              enim est eveniet labore atque? <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
              ex iste earum excepturi dolore ipsa totam fugiat iure possimus,
              repudiandae voluptas soluta blanditiis inventore error enim est
              eveniet labore atque?"
            </p>
            <div className={css.row}>
              <div className={css.col}>
                <img src={fest} alt="Портрет" className={css.image} />
              </div>
              <div className={css.col}>
                <p className={css.name}>Друг Фестиваль</p>
                <p className={css.description}>
                  Координатор організації "Поклик Яру"
                </p>
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
                <img src="" alt="Портрет" className={css.image} />
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
