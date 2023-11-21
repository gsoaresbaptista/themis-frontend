import { createContext, useEffect, useState } from "react";
import { Message, IMessagesProvider, MessageContextProps } from "./types";
import { Clear, LoadMessages, Question } from "@/services/operations";
import { getMessagesLocalStorage, setMessagesLocalStorage } from "./utils";

export const MessageContext = createContext<MessageContextProps>(
  {} as MessageContextProps
);

export const MessageProvider = ({ children }: IMessagesProvider) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const updateMessages = async () => {
    const messages = await LoadMessages();
    setMessages(messages);
    setMessagesLocalStorage(messages);
  };

  const clearMessages = async () => {
    await Clear();
    setMessages([]);
    setMessagesLocalStorage([]);
  };

  useEffect(() => {
    let messages = getMessagesLocalStorage();

    if (!messages) {
      updateMessages();
    } else {
      setMessages(messages);
    }
  }, []);

  const question = (
    text: string,
    callback: (msg: string, fullMSG: string) => void
  ) => {
    Question(text, callback);
  };

  return (
    <MessageContext.Provider
      value={{ messages, setMessages, question, updateMessages, clearMessages }}
    >
      {children}
    </MessageContext.Provider>
  );
};
