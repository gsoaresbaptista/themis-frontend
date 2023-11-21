import { Outlet, Navigate } from "react-router-dom";

import TopBar from "../../components/shared/TopBar";
import SideBar from "../../components/shared/SideBar";
import BottomBar from "../../components/shared/BottomBar";

import { useAuth } from "@/context/AuthProvider/useAuth";

export default function RootLayout() {
  const auth = useAuth();

  return (
    <>
      {!auth?.uuid ? (
        <Navigate to="/login" />
      ) : (
        <div className="w-full md:flex">
          <TopBar />
          <SideBar />

          <section className="flex flex-1 h-full">
            <Outlet />
          </section>

          <BottomBar />
        </div>
      )}
    </>
  );
}
