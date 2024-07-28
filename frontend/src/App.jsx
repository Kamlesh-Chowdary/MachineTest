import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Components/index";
function App() {
  const adminStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (adminStatus) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [adminStatus, navigate]);

  return (
    <>
      {adminStatus && <Header />}

      <Outlet />
    </>
  );
}

export default App;
