import { useEffect, useState } from "react";
import { LoadMessages, Question } from "../../../services/operations";
import { ProtectedLayout } from "../../../components/ProtectedLayout";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await LoadMessages();
      setMessages(messages);
    };
    fetchMessages();
  }, []);

  const question = () => {
    Question("The real secret of the", (_, fullMessage) => {
      setMessage(fullMessage);
    })
  };

  return (
    <ProtectedLayout>
      <>
        <h2>Converse com a themis</h2>
        <button onClick={question}>Perguntar</button>
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
    </ProtectedLayout>
  );
};

export default Chat;
