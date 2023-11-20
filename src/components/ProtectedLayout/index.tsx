import { useAuth } from "../../context/AuthProvider/useAuth";

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth.uuid) {
    return <h1>Ops! Parece que você não está na lista VIP do acesso.</h1>;
  }

  return children;
};
