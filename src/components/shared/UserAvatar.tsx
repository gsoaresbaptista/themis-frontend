import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useAuth } from "@/context/AuthProvider/useAuth";

function UserAvatar() {
  const auth = useAuth();

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
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback>{getNameLetters()}</AvatarFallback>
      </Avatar>
      <div className="hidden min-[460px]:block">
        <p>{auth?.name}</p>
        <p className="text-sm text-zinc-400">{auth?.email}</p>
      </div>
    </div>
  );
}

export default UserAvatar;
