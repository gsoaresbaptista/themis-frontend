import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/chat")}>Chat</button>
    </>
  );
};

export default Home;
