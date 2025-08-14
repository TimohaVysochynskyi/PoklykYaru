import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/selectors";
import { Navigate } from "react-router-dom";
import { NodeComponentType } from "../types/common.types";

export default function PrivateRoute({ component }: NodeComponentType) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to="/login" />;
}
