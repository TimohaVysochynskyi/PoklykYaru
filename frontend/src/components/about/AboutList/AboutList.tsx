import image1 from "../../../assets/about/1.webp";
import image2 from "../../../assets/about/2.webp";
import image3 from "../../../assets/about/3.webp";
import css from "./AboutList.module.css";

export default function AboutList() {
  return (
    <>
      <div className={css.container}>
        <div className={css.row}>
          <div className={css.col}>
            <p className={css.title}>Наша команда</p>
            <p className={css.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              ducimus, cupiditate beatae reiciendis magnam quam magni sequi
              consequuntur soluta voluptatem dignissimos dolor expedita error,
              suscipit eius amet nihil ratione vitae!
            </p>
          </div>
          <div className={css.col}>
            <img src={image1} alt="Фотографія" className={css.image} />
          </div>
        </div>
        <div className={css.row}>
          <div className={css.col}>
            <img src={image2} alt="Фотографія" className={css.image} />
          </div>
          <div className={css.col}>
            <p className={css.title}>Наша команда</p>
            <p className={css.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              ducimus, cupiditate beatae reiciendis magnam quam magni sequi
              consequuntur soluta voluptatem dignissimos dolor expedita error,
              suscipit eius amet nihil ratione vitae!
            </p>
          </div>
        </div>
        <div className={css.row}>
          <div className={css.col}>
            <p className={css.title}>Наша команда</p>
            <p className={css.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              ducimus, cupiditate beatae reiciendis magnam quam magni sequi
              consequuntur soluta voluptatem dignissimos dolor expedita error,
              suscipit eius amet nihil ratione vitae!
            </p>
          </div>
          <div className={css.col}>
            <img src={image3} alt="Фотографія" className={css.image} />
          </div>
        </div>
      </div>
    </>
  );
}
