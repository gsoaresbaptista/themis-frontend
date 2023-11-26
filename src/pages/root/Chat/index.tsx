import { useMessageContext } from "@/context/MessagesProvider/useMessages";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import UserIcon from "@/components/icons/UserIcon";
import LotusIcon from "@/components/icons/LotusIcon";
import { SendIcon } from "lucide-react";

const Chat = () => {
  const { messages, loading, question, uapdateMessages } = useMessageContext();
  const [shouldScroll, setShouldScroll] = useState(true);
  const [questionInput, setQuestionInput] = useState<string>("");
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
    if (!loading && questionInput !== "") {
      setQuestionInput("");
      await question(questionInput);
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleQuestionClick();
    }
  };

  return (
    <div className="flex flex-col w-full max-h-[80vh] md:max-h-[95vh] md:h-screen justify-center overflow-x-hidden">
      <div className="flex flex-col md:p-8 md:m-8 m-4 p-4 h-[90%] items-center">
        <div
          className="overflow-y-scroll pr-8 xl:max-w-3xl w-full gap-8 flex flex-col flex-1 overflow-x-hidden min-h-3/4"
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          {messages.length > 0 ? (
            messages?.map((message: any) => (
              <div key={message.id} className="w-full">
                <div className="flex gap-4 items-start">
                  <div className="bg-secondary/50 p-2 rounded-full">
                    <UserIcon />
                  </div>
                  <div className="userMessage message">
                    <p>{message.question}</p>
                  </div>
                </div>
                <div className="flex items-end gap-4 w-full">
                  <div className="botMessage message">{message.answer}</div>
                  <div className="bg-secondary/50 p-2 rounded-full">
                    <LotusIcon
                      width={28}
                      height={28}
                      className="fill-primary"
                    />
                  </div>
                </div>
                {/* <p>{message.created_at}</p> */}
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center flex-1">
              <div className="dark:bg-white bg-primary w-fit p-2 rounded-full">
                <LotusIcon
                  width={80}
                  height={80}
                  className="dark:fill-black fill-white"
                />
              </div>
              <h2 className="mt-5 text-xl">Como posso ajudar você hoje?</h2>
            </div>
          )}
        </div>
        <div className="flex gap-1 max-h-[100px] mt-10 md:max-w-2xl w-[80%] relative">
          <div className="w-full relative">
            <Textarea
              className="question-input rounded-xl resize-none"
              onKeyDown={async (event) => await handleKeyDown(event)}
              onChange={(event) => setQuestionInput(event.target.value)}
              value={questionInput}
              disabled={loading}
            />
            <div
              className={
                "flex items-center justify-center absolute right-3 bottom-0 h-full" +
                (loading || questionInput === "" ? "" : " cursor-pointer")
              }
              onClick={async () => await handleQuestionClick()}
            >
              <SendIcon
                className={loading ? "stroke-primary/25" : "stroke-primary/75"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
