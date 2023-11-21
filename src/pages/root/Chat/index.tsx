import { Button } from "@/components/ui/button";
import { useMessageContext } from "@/context/MessagesProvider/useMessages";
import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const data = useMessageContext();

  return (
    <>
      <h2>Converse com a themis</h2>
      <div className="flex gap-1">
        <Button
          onClick={() =>
            data.question("test question", (_, msg) => setMessage(msg))
          }
          className="shad-button"
        >
          Perguntar
        </Button>
        <Button onClick={async () => await data.updateMessages()} className="shad-button">
          Recarregar
        </Button>
      </div>
      <div>{message}</div>
      {data?.messages?.map((message: any) => (
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
