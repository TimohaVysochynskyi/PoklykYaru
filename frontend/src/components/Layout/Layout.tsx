import { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";

import css from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <main className={css.container}>{children}</main>
      <Footer />
    </>
  );
}
