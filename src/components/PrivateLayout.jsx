import { useNavigate } from "react-router-dom";
import useIndexStore from "../store";
import { useEffect } from "react";

const PrivateLayout = ({ children }) => {
  const isLogin = useIndexStore((state) => state.isLogin);
  const navigate = useNavigate();

  // Auth Logic
  useEffect(() => {
    if (!isLogin && !sessionStorage.getItem("authToken")) {
      {
        navigate("/login");
      }
    }
  });
  return <>{children}</>;
};

export default PrivateLayout;
