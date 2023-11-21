import { get, post } from "./api";
import { formatMessage } from "./utils";

export async function LoadMessages() {
  const response = await get("/messages");
  const data = await response.json();
  const messages = data.data.messages.map(formatMessage);
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

export async function Question(
  question: string,
  callback: (msg: string, fullMessage: string) => void
) {
  let fullMessage = "";

  await post("/messages/question", { question: question }).then((response) => {
    const reader = response?.body?.getReader();

    function processStream({
      done,
      value,
    }: ReadableStreamReadResult<Uint8Array>) {
      if (done) {
        return;
      }

      const message = new TextDecoder("utf-8").decode(value);
      fullMessage += message;
      callback(message, fullMessage);

      // continue reading
      reader?.read().then(processStream);
    }

    // start reading
    reader?.read().then(processStream);
  });
}
