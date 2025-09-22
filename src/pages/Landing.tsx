import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Sparkles } from "lucide-react";

const Landing = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleEnterChat = () => {
    if (username.trim()) {
      // Store username in localStorage for the chat page
      localStorage.setItem("chatUsername", username.trim());
      navigate("/chat");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEnterChat();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-primary/10 p-3 rounded-2xl shadow-glow">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <Sparkles className="h-6 w-6 text-primary-glow animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Welcome to ChatHub
          </h1>
          <p className="text-lg text-white/80">
            Enter your name to start chatting with AI
          </p>
        </div>

        {/* Username Input Card */}
        <div className="bg-card/10 backdrop-blur-lg rounded-2xl p-8 shadow-elegant border border-white/10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-white/90">
                Your Name
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-background/50 border-white/20 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            
            <Button 
              onClick={handleEnterChat}
              disabled={!username.trim()}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
              size="lg"
            >
              Start Chatting
              <MessageCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="text-center space-y-2">
          <p className="text-sm text-white/60">
            ✨ AI-powered conversations • 💬 Chat history • 🔒 Secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;