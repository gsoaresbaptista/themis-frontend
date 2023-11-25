import { Button } from "@/components/ui/button";
import { useMessageContext } from "@/context/MessagesProvider/useMessages";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const { messages, loading, question, updateMessages } = useMessageContext();
  const [shouldScroll, setShouldScroll] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && shouldScroll) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, shouldScroll]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    const atBottom =
      container!.scrollHeight - container!.scrollTop ===
      container!.clientHeight;
    setShouldScroll(atBottom);
  };

  const handleQuestionClick = async () => {
    await question("test question");
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex flex-col w-full max-h-[80vh] md:max-h-[95vh] md:h-screen justify-center">
      <div className="flex flex-col p-8 m-8 box-border h-[90%]">
        <h2>Converse com a themis</h2>
        <div className="flex gap-1">
          <Button
            onClick={async () => await handleQuestionClick()}
            disabled={loading}
            className="shad-button"
          >
            Perguntar
          </Button>
          <Button
            onClick={async () => await updateMessages()}
            className="shad-button"
            disabled={loading}
          >
            Recarregar
          </Button>
        </div>
        <div
          className="overflow-y-scroll pr-8"
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          {messages?.map((message: any) => (
            <div key={message.id}>
              <b>
                <p>{message.question}</p>
              </b>
              <p>{message.answer}</p>
              <p>{message.created_at}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
