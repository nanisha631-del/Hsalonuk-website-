import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, Heart } from "lucide-react";

interface ChatMessage {
  role: "user" | "lucas";
  content: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "lucas",
      content: "Hello! I am Lucas, live support specialist at H Salon, London. What custom self-care guidance or luxury formula recommendations can I offer you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setErrorStatus(null);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Create conversation history for context (exclude initial message if necessary, or just map all)
      const formattedHistory = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: formattedHistory
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to communicate with support server.");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "lucas", content: data.reply }]);
    } catch (err: any) {
      console.error("Chat interface failure:", err);
      setErrorStatus(err.message || "Apologies, I encountered an interruption in our direct connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Mini cute floating launcher icon on the bottom-right */}
      <div 
        id="ai-chatbot-root"
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none"
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              id="ai-chatbot-launcher-btn"
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 30, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto relative w-14 h-14 bg-[#3D4A3E] text-[#82D8C5] rounded-full flex items-center justify-center shadow-2xl cursor-pointer border border-[#3D4A3E]/10 hover:bg-[#2C362D] transition-colors group"
              title="Speak with Lucas at H Salon Support"
            >
              {/* Pulsing indicator ring */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-bounce">
                <span className="relative block w-2 h-2 rounded-full bg-white"></span>
              </span>
              
              {/* Sparking glow indicator */}
              <span className="absolute inset-0 rounded-full bg-[#82D8C5]/10 animate-ping pointer-events-none" />

              <MessageSquare className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6 text-[#82D8C5]" />
              
              {/* Cute hover text bubble pointing to the button */}
              <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-brand-black text-[10px] font-sans font-black tracking-widest uppercase px-3 py-1.5 rounded-xl border border-brand-black/5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:block">
                CHat Live with lucas
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Active Chat Windows Container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="ai-chatbot-window"
              initial={{ opacity: 0, scale: 0.85, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="pointer-events-auto w-[360px] sm:w-[400px] h-[520px] bg-white rounded-[32px] border border-brand-black/10 overflow-hidden shadow-2xl flex flex-col text-left mt-2"
            >
              {/* Header section with Lucas support profile */}
              <div className="bg-[#3D4A3E] px-6 py-5 flex items-center justify-between border-b border-[#3D4A3E]/20 text-white shrink-0">
                <div className="flex items-center gap-3">
                  {/* Styled online specialist avatar bubble */}
                  <div className="relative">
                    <span className="w-10 h-10 rounded-full bg-[#82D8C5]/20 border border-[#82D8C5]/30 flex items-center justify-center font-sans font-black text-[#82D8C5] text-[13px] tracking-wider uppercase select-none">
                      L
                    </span>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#3D4A3E] rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-sans font-black uppercase text-[12.5px] tracking-widest text-[#82D8C5] leading-none mb-1">
                      lucas
                    </h4>
                    <span className="text-[9.5px] font-sans font-bold tracking-wider text-white/70 block uppercase">
                      H Salon Support Specialist • Active
                    </span>
                  </div>
                </div>

                <button
                  id="ai-chatbot-close-btn"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat messages dialogue section */}
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#FCFAF7] via-white to-white space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[20px] px-4.5 py-3 text-[12px] font-sans leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#3D4A3E] text-white rounded-br-none"
                          : "bg-[#EDEDE9]/75 text-brand-black rounded-bl-none border border-brand-black/5"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[8px] font-sans font-bold tracking-wider text-gray-400 uppercase mt-1 px-1">
                      {msg.role === "user" ? "YOU" : "LUCAS"}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex flex-col items-start">
                    <div className="bg-[#EDEDE9]/75 rounded-[20px] rounded-bl-none px-4.5 py-3 border border-brand-black/5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#3D4A3E] rounded-full animate-bounce delay-0" />
                      <span className="w-1.5 h-1.5 bg-[#3D4A3E] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#3D4A3E] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span className="text-[8px] font-sans font-bold tracking-wider text-gray-400 uppercase mt-1 px-1">
                      LUCAS IS WRITING...
                    </span>
                  </div>
                )}

                {errorStatus && (
                  <div className="bg-red-50 text-red-700/95 border border-red-200/50 rounded-[20px] p-4 text-[11px] font-sans leading-relaxed flex gap-2.5 items-start">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider block mb-0.5">Connection Suspended</span>
                      <p>{errorStatus}</p>
                      <span className="text-[9px] block mt-1 underline">Verify GEMINI_API_KEY inside the Secrets panel.</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Bottom sending input toolbelt */}
              <form
                id="ai-chatbot-input-form"
                onSubmit={handleSendMessage}
                className="p-4 border-t border-brand-black/5 bg-white shrink-0 flex gap-2.5 items-center"
              >
                <input
                  id="ai-chatbot-input-field"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Inquire about scalp relief, formula tips..."
                  className="flex-1 bg-[#FCFAF7] border border-brand-black/5 focus:border-[#3D4A3E]/30 focus:outline-none rounded-xl px-4 py-3 text-[11.5px] font-sans text-brand-black placeholder-gray-400"
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  id="ai-chatbot-send-btn"
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-[42px] h-[42px] rounded-xl bg-[#3D4A3E] text-white flex items-center justify-center hover:bg-[#2C362D] cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
