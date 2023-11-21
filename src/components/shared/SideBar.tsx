import { Link } from "react-router-dom";
import Logo from "../ui/logo";
import UserAvatar from "./UserAvatar";

function SideBar() {
  return (
    <nav className="sidebar h-screen">
      <div className="flex flex-col gap-11">
        <Link to="/" className="block">
          <div className=""><Logo bigVersion={true} /></div>
        </Link>
        <UserAvatar />
      </div>
    </nav>
  )
}

export default SideBar;
