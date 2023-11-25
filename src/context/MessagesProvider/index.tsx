import { createContext, useEffect, useState } from "react";
import { Message, IMessagesProvider, MessageContextProps } from "./types";
import { Clear, GetLastMessage, LoadMessages, Question } from "@/services/operations";
import { getMessagesLocalStorage, setMessagesLocalStorage } from "./utils";
import { useAuth } from "../AuthProvider/useAuth";
import { formatDate } from "./utils";

export const MessageContext = createContext<MessageContextProps>(
  {} as MessageContextProps
);

const createFakeMessage = (question: string = "", answer: string = "") => {
  return {
    id: "",
    user_id: "",
    question: question,
    answer: answer,
    created_at: formatDate(new Date()),
  };
};

export const MessageProvider = ({ children }: IMessagesProvider) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const auth = useAuth();

  const updateMessages = async () => {
    try {
      const messages = await LoadMessages();
      setMessages(messages);
      setMessagesLocalStorage(messages);
    } catch (error) {
      auth.logout();
    }
  };

  const clearMessages = async () => {
    try {
      await Clear();
      setMessages([]);
      setMessagesLocalStorage([]);
    } catch (error) {
      auth.logout();
    }
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
    try {
      async function addMessageOnFinish() {
        const newMessage = await GetLastMessage();
        const updated = [...messages, newMessage];
        const uniques = updated.filter((message, index) => {
          return index === updated.findIndex(o => message.id === o.id);
        });
        setMessages(uniques);
        setMessagesLocalStorage(uniques);
      }
      Question(text, callback, addMessageOnFinish);
    } catch (error) {
      auth.logout();
    }
  };

  return (
    <MessageContext.Provider
      value={{ messages, setMessages, question, updateMessages, clearMessages }}
    >
      {children}
    </MessageContext.Provider>
  );
};
