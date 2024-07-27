import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

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
  return (
    <section>
      <header>
        <nav>
          <ul>
            {adminStatus &&
              navItems.map((item) => {
                return (
                  <NavLink key={item.name} to={item.path}>
                    <li>{item.name}</li>
                  </NavLink>
                );
              })}
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Header;
