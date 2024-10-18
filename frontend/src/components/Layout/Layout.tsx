import Footer from "../Footer/Footer";

import css from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <main className={css.container}>{children}</main>
      <Footer />
    </>
  );
}
