import { Link } from "react-router-dom";
import Logo from "../ui/logo";
import { Button } from "../ui/button";
import LogoutDialog from "./LogoutDialog";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthProvider/useAuth";

function TopBar() {
  const auth = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  function getNameLetters() {
    const commonArticles = ["de", "da", "do", "dos", "das"];
    const name = auth?.name?.split(" ");
    return name
      ?.filter((n) => !commonArticles.includes(n.toLowerCase()))
      .map((n) => n.charAt(0))
      .slice(0, 2)
      .join("");
  }

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => {
              setOpenDialog(!openDialog);
            }}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <LogoutDialog open={openDialog} setOpen={setOpenDialog} />
          <Avatar>
            <AvatarFallback>{getNameLetters()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </section>
  );
}

export default TopBar;
