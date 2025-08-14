import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAdminLoggedIn } from "../redux";
import { NodeComponentType } from "../types/common.types";

export default function RestrictedRoute({ component }: NodeComponentType) {
  const isLoggedIn = useSelector(selectIsAdminLoggedIn);

  return isLoggedIn ? <Navigate to="/admin" /> : component;
}
