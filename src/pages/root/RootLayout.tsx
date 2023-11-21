import { Outlet, Navigate } from "react-router-dom";

import TopBar from "../../components/shared/TopBar";
import SideBar from "../../components/shared/SideBar/SideBar";
import BottomBar from "../../components/shared/BottomBar";

import { useAuth } from "@/context/AuthProvider/useAuth";
import { ScrollArea } from "@/components/ui/scroll-area";

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

          <section className="max-h-screen flex-1">
            <ScrollArea className="flex flex-1 h-full max-h-screen">
              <Outlet />
            </ScrollArea>
          </section>

          <BottomBar />
        </div>
      )}
    </>
  );
}
