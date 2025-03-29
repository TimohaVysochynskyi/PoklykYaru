import { FaCalendarAlt, FaChild, FaClock } from "react-icons/fa";
import css from "./TabirFeaturesList.module.css";

export default function TabirFeaturesList() {
  const features = [
    {
      id: "calendar",
      icon: <FaCalendarAlt className={css.icon} />,
      text: "липень-серпень",
    },
    {
      id: "human",
      icon: <FaChild className={css.icon} />,
      text: "10-17 років",
    },
    { id: "clock", icon: <FaClock className={css.icon} />, text: "10 днів" },
  ];
  return (
    <>
      <ul className={css.list}>
        {features.map((feature) => (
          <li key={feature.id} className={css.item}>
            {feature.icon}
            <p className={css.text}>{feature.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
