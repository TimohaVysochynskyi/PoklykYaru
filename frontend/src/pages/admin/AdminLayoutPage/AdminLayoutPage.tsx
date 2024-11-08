import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { refreshAdmin } from "../../../redux/adminAuth/operations";

export default function AdminLayoutPage() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAdmin());
  }, [dispatch]);

  return <></>;
}
