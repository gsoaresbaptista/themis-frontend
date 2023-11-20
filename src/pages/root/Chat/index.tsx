import { useEffect, useState } from "react";
import { LoadMessages } from "../../../services/utils";
import { ProtectedLayout } from "../../../components/ProtectedLayout";
import { post } from "../../../services/api";

const Chat = () => {
  let text = "";
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await LoadMessages();
        const data = await response.json();

        const formattedTime = new Intl.DateTimeFormat("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const messages = data.data.messages.map((message: any) => {
          return {
            id: message.id,
            question: message.question,
            answer: message.answer,
            created_at: formattedTime.format(
              Date.parse(message.created_at) - 60 * 60 * 3 * 1000
            ),
          };
        });

        setMessages(messages);
      } catch (error) {}
    };

    fetchMessages();
  }, []);

  const question = () => {
    post("/messages/question", { question: "The real secret of the" }).then(
      (response) => {
        const reader = response?.body?.getReader();
        function processStream({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>) {
          if (done) {
            console.log("Stream complete");
            return;
          }
          text += new TextDecoder("utf-8").decode(value);
          setMessage(text);
          reader?.read().then(processStream);
        }
        reader?.read().then(processStream);
      }
    );
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
