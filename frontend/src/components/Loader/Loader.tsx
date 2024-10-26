import { Oval } from "react-loader-spinner";

import css from "./Loader.module.css";

type Props = {
  size: string;
};

export default function Loader({ size }: Props) {
  return (
    <>
      <Oval
        visible={true}
        height={size}
        width={size}
        ariaLabel="oval-loading"
        wrapperClass={css.container}
      />
    </>
  );
}
