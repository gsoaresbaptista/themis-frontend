export interface Message {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  created_at: string;
}

export interface MessageContextProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  question: (text: string, callback: (msg: string, fullMSG: string) => void) => void;
  updateMessages: () => Promise<void>;
  clearMessages: () => Promise<void>;
}

export interface IMessagesProvider {
  children: JSX.Element;
}
