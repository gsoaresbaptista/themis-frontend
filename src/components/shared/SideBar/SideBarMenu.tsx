import { NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";

import HomeIcon from "@/components/icons/HomeIcon";
import AboutIcon from "@/components/icons/AboutIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import SettingsIcons from "@/components/icons/SettingsIcon";
import LogoutIcon from "@/components/icons/logoutIcon";

import LogoutDialog from "../LogoutDialog";

const menuItems = [
  { path: "/chat", label: "Home", icon: HomeIcon },
  { path: "/about", label: "Sobre", icon: AboutIcon },
  { path: "/code", label: "Código", icon: CodeIcon },
  { path: "#", label: "Configuração", icon: SettingsIcons, onClick: () => alert("clicado") },
];

function SideBarMenu() {
  const [openDialog, setOpenDialog] = useState(false);
  const { pathname } = useLocation();
  const liClass = (path: any, item: any) => `sidebar-link group ${pathname === item.path ? "active" : ""}`;

  return (
    <>
      <LogoutDialog open={openDialog} setOpen={setOpenDialog} />
      <ul className="flex flex-1 flex-col gap-6">
        {menuItems.map((item, index) => (
          <li key={index} className={liClass(pathname, item)}>
            <NavLink to={item.path} className="navlink font-medium" onClick={item.onClick}>
              {React.createElement(item.icon, {
                className: `${
                  pathname === item.path ? "fill-white" : "dark:fill-primary"
                }`,
              })}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="sidebar-link group">
        <NavLink
          to="#"
          className="navlink font-medium"
          onClick={() => setOpenDialog(!openDialog)}
        >
          <LogoutIcon className="dark:fill-primary" />
          Deslogar
        </NavLink>
      </div>
    </>
  );
}

export default SideBarMenu;
