import { get, post } from "./api";

export async function LoadMessages() {
  return await get("/messages");
}

export async function CreateUser({
  name,
  email,
  password,
  passwordCheck,
}: {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}) {
  return await post("/users/sign-up", { name, email, password, passwordCheck });
}
