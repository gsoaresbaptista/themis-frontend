import { useEffect, useState } from "react";
import { LoadMessages, Question } from "../../../services/operations";
import { Button } from "@/components/ui/button";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const messages = localStorage.getItem("messages");

    if (messages) {
      setMessages(JSON.parse(messages));
    } else {
      reloadMessages();
    }
  }, []);

  function reloadMessages() {
    const fetchMessages = async () => {
      const messages = await LoadMessages();
      setMessages(messages);
      localStorage.setItem("messages", JSON.stringify(messages));
    };
    fetchMessages();
  }

  const question = () => {
    Question("The real secret of the", (_, fullMessage) => {
      setMessage(fullMessage);
    });
  };

  return (
    <>
      <h2>Converse com a themis</h2>
      <div className="flex gap-1">
        <Button onClick={question} className="shad-button">Perguntar</Button>
        <Button onClick={() => reloadMessages()} className="shad-button">Recarregar</Button>
      </div>
      <div>{message}</div>
      {messages.map((message: any) => (
        <div key={message.id}>
          <b>
            <p>{message.question}</p>
            {message.created_at}
          </b>
          <p>{message.answer}</p>
        </div>
      ))}
    </>
  );
};

export default Chat;
