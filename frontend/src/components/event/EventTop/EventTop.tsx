import css from "./EventTop.module.css";

export default function EventTop() {
  const items = [
    { title: "Літній табір", image: "tabir" },
    { title: 'Акція "Щедруй для захисників"', image: "shchedrui" },
    { title: "Зимовий похід ім. Ю. Горліс-Горського", image: "pohid" },
    { title: "Туристичний змаг ім. Василя Чучупаки", image: "zmah" },
    { title: "Покрова", image: "pokrova" },
  ];
  return (
    <>
      <ul className={css.list}>
        {items.map((item) => (
          <li className={css.item} key={item.image}>
            <img
              src={`/event/${item.image}.webp`}
              alt=""
              className={css.image}
            />
            <p className={css.title}>{item.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
