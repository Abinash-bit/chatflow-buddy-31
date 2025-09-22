import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { ChatInput } from "@/components/chat/ChatInput";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("chatUsername");
    if (!storedUsername) {
      navigate("/");
      return;
    }
    setUsername(storedUsername);

    // Load conversations from localStorage
    const storedConversations = localStorage.getItem("chatConversations");
    if (storedConversations) {
      const parsed = JSON.parse(storedConversations);
      setConversations(parsed);
      if (parsed.length > 0) {
        setActiveConversationId(parsed[0].id);
      }
    }
  }, [navigate]);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      lastMessage: new Date(),
    };
    
    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    setActiveConversationId(newConversation.id);
    localStorage.setItem("chatConversations", JSON.stringify(updatedConversations));
  };

  const sendMessage = async (content: string) => {
    if (!activeConversationId) {
      createNewConversation();
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversationId) {
        const updatedMessages = [...conv.messages, userMessage];
        return {
          ...conv,
          messages: updatedMessages,
          title: conv.messages.length === 0 ? content.slice(0, 30) + "..." : conv.title,
          lastMessage: new Date(),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Hello ${username}! I understand you said: "${content}". I'm a simulated AI assistant. How can I help you today?`,
        sender: "assistant",
        timestamp: new Date(),
      };

      const finalConversations = updatedConversations.map(conv => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, userMessage, aiMessage],
            lastMessage: new Date(),
          };
        }
        return conv;
      });

      setConversations(finalConversations);
      localStorage.setItem("chatConversations", JSON.stringify(finalConversations));
      setIsLoading(false);
    }, 1000);
  };

  const deleteConversation = (conversationId: string) => {
    const updatedConversations = conversations.filter(c => c.id !== conversationId);
    setConversations(updatedConversations);
    
    if (activeConversationId === conversationId) {
      setActiveConversationId(updatedConversations.length > 0 ? updatedConversations[0].id : null);
    }
    
    localStorage.setItem("chatConversations", JSON.stringify(updatedConversations));
  };

  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewConversation={createNewConversation}
        onDeleteConversation={deleteConversation}
        username={username}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatArea 
          conversation={activeConversation}
          isLoading={isLoading}
          username={username}
        />
        <ChatInput 
          onSendMessage={sendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Chat;