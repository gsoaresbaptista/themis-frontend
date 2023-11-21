import { get, post } from "./api";
import { formatMessage } from "./utils";

export async function LoadMessages() {
  const response = await get("/messages");
  const data = await response.json();
  const messages = data.data.messages.map(formatMessage)
  return messages;
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
