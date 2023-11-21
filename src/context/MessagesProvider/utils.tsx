import { Message } from "./types";

export function setMessagesLocalStorage(messages: Message[]) {
  localStorage.setItem("messages", JSON.stringify(messages));
}

export function getMessagesLocalStorage() {
  const json = localStorage.getItem("messages");

  if (!json) {
    return null;
  }

  const messages = JSON.parse(json);

  return messages ?? [];
}
