import { useSelector } from "react-redux";
import { selectIsAdminLoggedIn } from "../redux";
import { Navigate } from "react-router-dom";
import { NodeComponentType } from "../types/common.types";

export default function PrivateRoute({ component }: NodeComponentType) {
  const isLoggedIn = useSelector(selectIsAdminLoggedIn);
  return isLoggedIn == true ? component : <Navigate to="/admin/login" />;
}
