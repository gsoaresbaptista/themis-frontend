import HomeIcon from "@/components/icons/HomeIcon";
import AboutIcon from "@/components/icons/AboutIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import SettingsIcons from "@/components/icons/SettingsIcon";
import LogoutIcon from "@/components/icons/logoutIcon";
import { NavLink, useLocation } from "react-router-dom";

function SideBarMenu() {
  const { pathname } = useLocation();

  return (
    <>
      <ul className="flex flex-1 flex-col gap-6">
        <li
          className={`sidebar-link group ${
            pathname === "/chat" ? "active" : ""
          }`}
        >
          <NavLink to="/chat" className="navlink font-medium">
            <HomeIcon
              className={`${
                pathname === "/chat" ? "fill-white" : "dark:fill-primary"
              }`}
            />
            Home
          </NavLink>
        </li>
        <li
          className={`sidebar-link group ${
            pathname === "/about" ? "active" : ""
          }`}
        >
          <NavLink to="/about" className="navlink font-medium">
            <AboutIcon
              className={`${
                pathname === "/about" ? "fill-white" : "dark:fill-primary"
              }`}
            />
            Sobre
          </NavLink>
        </li>
        <li
          className={`sidebar-link group ${
            pathname === "/code" ? "active" : ""
          }`}
        >
          <NavLink to="/code" className="navlink font-medium">
            <CodeIcon
              className={`${
                pathname === "/code" ? "fill-white" : "dark:fill-primary"
              }`}
            />
            Código
          </NavLink>
        </li>
        <li className="sidebar-link group">
          <NavLink
            to="#"
            onClick={() => alert("clicado")}
            className="navlink font-medium"
          >
            <SettingsIcons className="dark:stroke-primary" />
            Configuração
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-link group">
        <NavLink to="/chat" className="navlink font-medium">
          <LogoutIcon className="dark:fill-primary" />
          Deslogar
        </NavLink>
      </div>
    </>
  );
}

export default SideBarMenu;
