import { Bot, User } from "lucide-react";
import type { Message } from "@/pages/Chat";

interface ChatMessageProps {
  message: Message;
  username: string;
}

export const ChatMessage = ({ message, username }: ChatMessageProps) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? "bg-chat-user" 
          : "bg-chat-assistant"
      }`}>
        {isUser ? (
          <User className="h-4 w-4 text-chat-user-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-chat-assistant-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? "text-right" : "text-left"}`}>
        <div className={`inline-block p-4 rounded-2xl ${
          isUser 
            ? "bg-chat-user text-chat-user-foreground rounded-br-md" 
            : "bg-chat-assistant text-chat-assistant-foreground rounded-bl-md"
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <div className={`mt-1 text-xs text-muted-foreground ${isUser ? "text-right" : "text-left"}`}>
          {isUser ? username : "Assistant"} • {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};