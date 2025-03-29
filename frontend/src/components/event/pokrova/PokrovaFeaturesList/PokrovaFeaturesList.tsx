import css from "./PokrovaFeaturesList.module.css";

export default function PokrovaFeaturesList() {

  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
            <p className={css.text}><span>230</span><br /> смолоскипів на честь Захисників України</p>
        </li>
        <li className={css.item}>
            <p className={css.text}><span>230</span><br /> вогнів, що палали в живій карті Великої України</p>
        </li>
        <li className={css.item}>
            <p className={css.text}><span>230-ти</span><br /> кратне "Слава!" лунало від Холодноярського лісу</p>
        </li>
      </ul>
    </>
  );
}
