import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/authSlice";
const Header = () => {
  const adminStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      path: "",
    },
    {
      name: "Employee List",
      path: "employee-list",
    },
  ];
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section>
      <header>
        <nav>
          <ul className="flex bg-[#DEEAF6] p-2 justify-around items-center text-xl">
            {adminStatus &&
              navItems.map((item) => {
                return (
                  <NavLink key={item.name} to={item.path}>
                    <li className="hover:bg-white rounded p-2">{item.name}</li>
                  </NavLink>
                );
              })}
            <li>{localStorage.getItem("admin")} -</li>
            <li className="hover:bg-white rounded p-2">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Header;
