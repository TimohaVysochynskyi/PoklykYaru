import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/customerAuth/selectors";
import { NodeComponentType } from "../types/common.types";

export default function RestrictedRoute({ component }: NodeComponentType) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/" /> : component;
}
