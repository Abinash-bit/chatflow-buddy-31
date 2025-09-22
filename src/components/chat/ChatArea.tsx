import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { Loader2, MessageCircle } from "lucide-react";
import type { Conversation } from "@/pages/Chat";

interface ChatAreaProps {
  conversation?: Conversation;
  isLoading: boolean;
  username: string;
}

export const ChatArea = ({ conversation, isLoading, username }: ChatAreaProps) => {
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md">
          <div className="bg-primary/10 p-4 rounded-2xl mx-auto w-fit">
            <MessageCircle className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Welcome to ChatHub, {username}!
            </h2>
            <p className="text-muted-foreground">
              Start a new conversation or select an existing one from the sidebar.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-card/50">
        <h2 className="text-lg font-semibold text-foreground truncate">
          {conversation.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {conversation.messages.length} messages
        </p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {conversation.messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-primary/10 p-3 rounded-2xl mx-auto w-fit mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            conversation.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                username={username}
              />
            ))
          )}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="bg-chat-assistant p-3 rounded-2xl rounded-bl-md">
                <Loader2 className="h-4 w-4 text-chat-assistant-foreground animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};