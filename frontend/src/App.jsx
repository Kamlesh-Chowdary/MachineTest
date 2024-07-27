import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
function App() {
  const adminStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (adminStatus) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [adminStatus, navigate]);

  return <Outlet />;
}

export default App;
