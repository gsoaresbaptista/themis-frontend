import { Button } from "@/components/ui/button";
import { useMessageContext } from "@/context/MessagesProvider/useMessages";

const Chat = () => {
  const data = useMessageContext();

  return (
    <>
      <h2>Converse com a themis</h2>
      <div className="flex gap-1">
        <Button
          onClick={async () => await data.question("test question")}
          disabled={data.loading}
          className="shad-button"
        >
          Perguntar
        </Button>
        <Button
          onClick={async () => await data.updateMessages()}
          className="shad-button"
          disabled={data.loading}
        >
          Recarregar
        </Button>
      </div>
      {data?.messages?.map((message: any) => (
        <div key={message.id}>
          <b>
            <p>{message.question}</p>
          </b>
          <p>{message.answer}</p>
          <p>{message.created_at}</p>
        </div>
      ))}
    </>
  );
};

export default Chat;
