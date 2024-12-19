import image from "../../assets/values/image.jpeg";
import css from "./ValuesList.module.css";

export default function ValuesList() {
  return (
    <>
      <div className={css.value}>
        <p className={css.title}>Побратимство</p>
        <p className={css.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          praesentium porro sed quidem, autem rem vel consequuntur ipsa fugiat
          temporibus eligendi voluptates alias numquam totam consectetur sit
          corporis recusandae? Voluptate?
        </p>
        <div className={css.imagesWrapper}>
          <img src={image} alt="Картинка" className={css.image} />
          <img src={image} alt="Картинка" className={css.image} />
        </div>
        <p className={css.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          magnam deserunt sequi non aliquam ipsa vero laboriosam odit, sunt eos
          unde quia, pariatur inventore id ratione quod blanditiis corrupti
          aspernatur. Consectetur perferendis, quasi repellendus iste sed
          placeat maiores unde sit eum dignissimos, illum mollitia culpa modi
          voluptatum animi soluta nostrum laborum at? Voluptatibus esse velit
          tenetur quod unde voluptas labore! Exercitationem, ab qui mollitia
          unde impedit ipsa neque iusto excepturi corporis numquam. Unde minima
          at in tempore, consectetur distinctio explicabo, recusandae vero sunt
          quos non laborum optio est beatae nesciunt!
        </p>
      </div>
      <div className={css.value}>
        <p className={css.title}>Дисципліна</p>
        <p className={css.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          praesentium porro sed quidem, autem rem vel consequuntur ipsa fugiat
          temporibus eligendi voluptates alias numquam totam consectetur sit
          corporis recusandae? Voluptate?
        </p>
        <div className={css.imagesWrapper}>
          <img src={image} alt="Картинка" className={css.image} />
          <img src={image} alt="Картинка" className={css.image} />
        </div>
        <p className={css.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          magnam deserunt sequi non aliquam ipsa vero laboriosam odit, sunt eos
          unde quia, pariatur inventore id ratione quod blanditiis corrupti
          aspernatur. Consectetur perferendis, quasi repellendus iste sed
          placeat maiores unde sit eum dignissimos, illum mollitia culpa modi
          voluptatum animi soluta nostrum laborum at? Voluptatibus esse velit
          tenetur quod unde voluptas labore! Exercitationem, ab qui mollitia
          unde impedit ipsa neque iusto excepturi corporis numquam. Unde minima
          at in tempore, consectetur distinctio explicabo, recusandae vero sunt
          quos non laborum optio est beatae nesciunt!
        </p>
      </div>
      <div className={css.value}>
        <p className={css.title}>Патріотизм</p>
        <p className={css.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          praesentium porro sed quidem, autem rem vel consequuntur ipsa fugiat
          temporibus eligendi voluptates alias numquam totam consectetur sit
          corporis recusandae? Voluptate?
        </p>
        <div className={css.imagesWrapper}>
          <img src={image} alt="Картинка" className={css.image} />
          <img src={image} alt="Картинка" className={css.image} />
        </div>
        <p className={css.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          magnam deserunt sequi non aliquam ipsa vero laboriosam odit, sunt eos
          unde quia, pariatur inventore id ratione quod blanditiis corrupti
          aspernatur. Consectetur perferendis, quasi repellendus iste sed
          placeat maiores unde sit eum dignissimos, illum mollitia culpa modi
          voluptatum animi soluta nostrum laborum at? Voluptatibus esse velit
          tenetur quod unde voluptas labore! Exercitationem, ab qui mollitia
          unde impedit ipsa neque iusto excepturi corporis numquam. Unde minima
          at in tempore, consectetur distinctio explicabo, recusandae vero sunt
          quos non laborum optio est beatae nesciunt!
        </p>
      </div>
    </>
  );
}
