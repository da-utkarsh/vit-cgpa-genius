
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, MessageSquare, Loader2 } from "lucide-react";
import PageHeader from "../components/PageHeader";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const CgpaChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your CGPA AI assistant. I can help answer your questions about VIT's CGPA system, grade improvement strategies, and more. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "To calculate your CGPA at VIT, multiply each course's credit by its grade point, sum these values, and divide by the total credits. For example, a 3-credit 'A' grade (9 points) and a 4-credit 'B' grade (8 points) gives (3×9 + 4×8) ÷ 7 = 8.43 CGPA.",
        "VIT uses a 10-point grading system: S (10), A (9), B (8), C (7), D (6), E (5), and F/N (0). These grades, along with course credits, determine your CGPA.",
        "To improve your CGPA, focus on high-credit courses, prioritize consistent performance over perfect scores, and consider retaking courses with low grades if VIT's policy allows.",
        "Most top tech companies at VIT placements require a minimum CGPA of 7.5 to 8.0. However, some companies may consider lower CGPAs for exceptional candidates with strong projects and skills.",
        "The CGPA required for higher studies abroad varies by institution and program. Generally, a CGPA of 8.0+ (equivalent to a 3.5+ GPA on a 4.0 scale) is competitive for top universities.",
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageHeader
        title="CGPA AI Chat"
        description="Get personalized advice and answers about CGPA calculation, improvement strategies, and more."
      />

      <motion.div
        className="glass-card rounded-xl overflow-hidden flex flex-col h-[600px] max-h-[80vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-4 bg-primary/5 border-b">
          <div className="flex items-center space-x-3">
            <Bot className="text-primary" size={20} />
            <div>
              <h3 className="font-medium">CGPA Assistant</h3>
              <p className="text-xs text-muted-foreground">AI-powered CGPA advisor</p>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                <div className="flex items-center mb-1 space-x-2">
                  {message.sender === "user" ? (
                    <User size={14} className="text-primary-foreground" />
                  ) : (
                    <Bot size={14} />
                  )}
                  <span className="text-xs font-medium">
                    {message.sender === "user" ? "You" : "CGPA Assistant"}
                  </span>
                </div>
                <p className="text-sm">{message.text}</p>
                <div className="text-right">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="max-w-[80%] rounded-lg p-3 bg-secondary">
                <div className="flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">CGPA Assistant is typing...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <textarea
              className="flex-grow px-3 py-2 rounded-md border border-input bg-transparent input-focus-ring resize-none"
              placeholder="Ask about CGPA calculation, improvement strategies, etc."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <motion.button
              className="p-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendMessage}
              disabled={input.trim() === "" || isTyping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={18} />
            </motion.button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground text-center">
            This is a demo chat. In the full version, responses would be powered by Gemini AI.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="mt-12 glass-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <MessageSquare className="mr-2 text-primary" size={20} />
          Sample Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "How do I calculate my CGPA at VIT?",
            "What is the grading system at VIT?",
            "How can I improve my CGPA?",
            "What CGPA do I need for placements?",
            "What CGPA is required for higher studies abroad?",
            "How do I convert my 10-point CGPA to a 4-point GPA?",
          ].map((question, index) => (
            <motion.button
              key={index}
              className="text-left p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors text-sm"
              onClick={() => {
                setInput(question);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default CgpaChat;
