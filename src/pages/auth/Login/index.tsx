import { FormEvent } from "react";
import { useAuth } from "../../../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response = await auth.authenticate(email, password);

    if (response) {
      navigate('/profile');
    } else {
      console.log('E-mail ou senha inválidos!');
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        E-mail:
        <input
          type="text"
          name="email"
        />
      </label>
      <label>
        Senha:
        <input
          type="password"
          name="password"
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
