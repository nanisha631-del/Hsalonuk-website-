import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, AlertCircle, ShoppingBag, Eye } from "lucide-react";
import { useSharedState, formatPrice } from "../useSharedState";
import { PRODUCTS } from "../data";
import { Product } from "../types";

interface ChatMessage {
  role: "user" | "lucas";
  content: string;
}

const CHOSEN_TOPICS = [
  { id: "dry-scalp", label: "Dry/Flaky Scalp", query: "I have a dry and flaky scalp. What products do you recommend?" },
  { id: "hair-loss", label: "Hair Shedding", query: "I am experiencing hair shedding and thinning. What can I use?" },
  { id: "tension", label: "Scalp Tension", query: "How do I relieve scalp tension and stress?" },
  { id: "damage", label: "Split Ends & Heat", query: "My hair has split ends and heat damage, what do you suggest?" },
  { id: "accessories", label: "Accessories", query: "Show me details about your signature styling cap and velvet spa kit." },
];

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "lucas",
      content: "Hello! I am Lucas, live support specialist at H Salon, London. What custom self-care guidance or luxury formula recommendations can I offer you today? Tap one of our curated topics below to begin!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const { state, handleAddToCart, handleSelectProduct } = useSharedState();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isLauncherVisible, setIsLauncherVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Periodic launcher visibility effect for fade-in & slide-in from the right side every few seconds
  useEffect(() => {
    // Initial entrance delay of 2.5 seconds
    const initialTimer = setTimeout(() => {
      setIsLauncherVisible(true);
    }, 2500);

    // Stays visible for 8 seconds, slides out for 3.5 seconds, then slides back in smoothly
    const interval = setInterval(() => {
      setIsLauncherVisible(false);
      setTimeout(() => {
        setIsLauncherVisible(true);
      }, 3500);
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Robust parser to scan bot messages for recommended product cards
  const findRecommendedProducts = (text: string): Product[] => {
    const lower = text.toLowerCase();
    const found: Product[] = [];
    
    const productMatchers = [
      { keys: ["serene scalp treatment", "scalp treatment"], id: "snail-silk-serum" },
      { keys: ["serene scalp masque", "scalp masque", "serene scalp mask"], id: "snail-silk-scalp-mask" },
      { keys: ["gold lust", "gold lust hair oil", "gold lust oil"], id: "snail-silk-scalp-oil" },
      { keys: ["recovery face oil", "recovery oil"], id: "ground-recovery-oil" },
      { keys: ["active body oil", "body oil"], id: "gym-silk" },
      { keys: ["elixir ultime", "kerastase elixir", "kérastase elixir"], id: "halo-highlighter" },
      { keys: ["power drops", "hydration booster"], id: "color-mascara" },
      { keys: ["caviar serum", "chronologiste"], id: "eye-shadow-stick" },
      { keys: ["sleep face balm", "sleep balm", "face balm"], id: "concealer" },
      { keys: ["olaplex", "bond protector", "olaplex no. 9"], id: "eyeliner" },
      { keys: ["split-end", "split end", "nutritive split"], id: "lip-gloss" },
      { keys: ["styling cap", "signature cap", "h salon cap"], id: "h-salon-cap" },
    ];
    
    productMatchers.forEach((m) => {
      if (m.keys.some((k) => lower.includes(k))) {
        const prod = PRODUCTS.find((p) => p.id === m.id);
        if (prod && !found.some((p) => p.id === m.id)) {
          found.push(prod);
        }
      }
    });
    
    return found;
  };

  const getLocalSupportResponse = (msg: string): string => {
    const cleanMsg = msg.toLowerCase();
    
    // 1. Delivery & Shipping
    if (cleanMsg.includes("deliver") || cleanMsg.includes("shipping") || cleanMsg.includes("ship") || cleanMsg.includes("how long") || cleanMsg.includes("transit") || cleanMsg.includes("arrive") || cleanMsg.includes("postage") || cleanMsg.includes("time") || cleanMsg.includes("days")) {
      return "Our premium collections are hand-packaged and shipped directly from Mayfair, London via DHL Express. UK orders arrive in 1–2 business days, while international deliveries to the USA, Canada, Europe, Australia, India, or UAE take just 3–5 business days. Once your package is on its way, you will receive a tracking link via email!";
    }
    
    // 2. Returns & Refunds
    if (cleanMsg.includes("refund") || cleanMsg.includes("return") || cleanMsg.includes("exchange") || cleanMsg.includes("guarantee") || cleanMsg.includes("cancel") || cleanMsg.includes("wrong item")) {
      return "We offer a 30-day luxury satisfaction guarantee. If any formula doesn't align perfectly with your hair wellness ritual, you are welcome to return or exchange it in its original packaging within 30 days. Simply email our concierge at concierge@hsalon.london, and we'll dispatch a complimentary prepaid return label immediately.";
    }
    
    // 3. Contact & Location
    if (cleanMsg.includes("where") || cleanMsg.includes("located") || cleanMsg.includes("location") || cleanMsg.includes("address") || cleanMsg.includes("salon") || cleanMsg.includes("london") || cleanMsg.includes("phone") || cleanMsg.includes("call") || cleanMsg.includes("store") || cleanMsg.includes("studio") || cleanMsg.includes("contact")) {
      return "Our physical flagship boutique and head spa therapy studio are situated in the heart of Mayfair, London. For personalized concierge booking, inquiries, or custom orders, you can reach our team at concierge@hsalon.london or call us directly at +44 20 7946 0192.";
    }
    
    // 4. Authenticity & Formulas
    if (cleanMsg.includes("organic") || cleanMsg.includes("natural") || cleanMsg.includes("botanical") || cleanMsg.includes("authentic") || cleanMsg.includes("ingredients") || cleanMsg.includes("real") || cleanMsg.includes("animal") || cleanMsg.includes("tested") || cleanMsg.includes("vegan")) {
      return "Rest assured that every bottle we sell is 100% authentic, fresh from prestige London and French laboratories. Our botanical mixtures combine bio-fermented hair nutrients with pure cold-pressed oils. Every formula is entirely cruelty-free and dermatologically certified.";
    }

    // 5. Scalp specific
    if (cleanMsg.includes("dry") || cleanMsg.includes("flake") || cleanMsg.includes("dandruff") || cleanMsg.includes("itch") || cleanMsg.includes("irritation") || cleanMsg.includes("scalp")) {
      return "I completely understand how frustrating scalp flaking or dryness can be! I highly recommend our soothing 'Oribe Serene Scalp Treatment' to cool itchiness, paired with the luxurious 'Oribe Serene Scalp Masque' to deeply hydrate. I've provided their direct product links below so you can add them to your cart instantly!";
    } 
    
    // 6. Hair fall / Growth
    if (cleanMsg.includes("hair fall") || cleanMsg.includes("shedding") || cleanMsg.includes("thinning") || cleanMsg.includes("loss") || cleanMsg.includes("fall") || cleanMsg.includes("grow") || cleanMsg.includes("growth")) {
      return "Dealing with hair shedding and thinning can be discouraging, but our premium 'Oribe Gold Lust Hair Oil' delivers intense nourishment to fortify hair fibers. Pair it with the 'Kérastase Chronologiste Caviar Serum' to regenerate your hair vitality. I've placed their direct add-to-cart links below to help you get started right away!";
    } 
    
    // 7. Tension & Stress relief
    if (cleanMsg.includes("tension") || cleanMsg.includes("headache") || cleanMsg.includes("stress") || cleanMsg.includes("relax") || cleanMsg.includes("massage") || cleanMsg.includes("sleep")) {
      return "To dissolve deep facial tension and support a restful night, nothing compares to the 'Ground Wellbeing Sleep Face Balm' combined with the soothing organic botanical extracts of 'The Recovery Face Oil'. I have provided direct product links below so you can easily add them and start your evening ritual!";
    } 
    
    // 8. Muscle / Body Care
    if (cleanMsg.includes("muscle") || cleanMsg.includes("body") || cleanMsg.includes("active") || cleanMsg.includes("workout") || cleanMsg.includes("sport") || cleanMsg.includes("pain")) {
      return "For active recovery and deep muscle stimulation, 'The Active Body Oil' is magnificent. It contains Eucalyptus, Black Pepper, and Ginger to soothe sore muscles. You can view its details or add it to your cart using the link below!";
    } 
    
    // 9. Heat Damage & Split ends
    if (cleanMsg.includes("damage") || cleanMsg.includes("split") || cleanMsg.includes("heat") || cleanMsg.includes("dry hair")) {
      return "To repair split ends and protect your hair from heat damage, I highly recommend 'Kérastase Nutritive Split-End Serum' or the 'Olaplex No. 9 Bond Protector Serum'. I've listed both of these advanced formulas below for quick access!";
    } 
    
    // 10. Accessories & Apparel
    if (cleanMsg.includes("cap") || cleanMsg.includes("comb") || cleanMsg.includes("accessories") || cleanMsg.includes("bag")) {
      return "Our lifestyle accessories are superb! Style and protect your hair with our signature organic cotton 'H Salon Signature Styling Cap' or detangle gently with the hand-carved 'H Salon Luxury Texture Comb'. The direct product details and add-to-cart links are available below!";
    } 
    
    // 11. Routine bundles
    if (cleanMsg.includes("bundle") || cleanMsg.includes("all") || cleanMsg.includes("routine") || cleanMsg.includes("complete") || cleanMsg.includes("ritual")) {
      return "For the ultimate crown revival, we suggest our premium 'Oribe Serene Scalp Treatment' and 'Oribe Gold Lust Hair Oil'. Check out the direct product options below to add them directly to your cart and build your ritual!";
    } 
    
    // 12. Politeness / Thanks
    if (cleanMsg.includes("thank") || cleanMsg.includes("thanks") || cleanMsg.includes("great") || cleanMsg.includes("perfect") || cleanMsg.includes("awesome") || cleanMsg.includes("ok")) {
      return "It is an absolute honor to assist you! Please check out the recommended product links below so you can easily find them and add them to your cart. Let me know if you need any other guidance.";
    } 
    
    // 13. General greetings
    if (cleanMsg.includes("hello") || cleanMsg.includes("hi") || cleanMsg.includes("hey") || cleanMsg.includes("morning") || cleanMsg.includes("afternoon") || cleanMsg.includes("evening")) {
      return "Hello! Welcome to H Salon live support, London. I am Lucas, your personal scalp therapist and concierge. How may I assist you with your hair wellness journey today?";
    }

    // Default human fallback
    return "I would be absolutely delighted to assist you with that! Our Mayfair boutique is fully stocked with premium dermatologist-tested hair care and relaxation aids. Could you please share a bit more about your hair concerns or skin type so I can recommend the exact formula and send you the direct add-to-cart link?";
  };

  const handleSendQuery = async (userMessage: string) => {
    if (isLoading) return;
    setErrorStatus(null);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
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
        throw new Error("HTTP connection error: status " + res.status);
      }

      let data;
      try {
        data = await res.json();
      } catch (_) {
        throw new Error("Response was not a valid JSON object.");
      }

      if (!data || !data.reply) {
        throw new Error("Support response contained empty body.");
      }
      
      setMessages((prev) => [...prev, { role: "lucas", content: data.reply }]);
    } catch (err: any) {
      console.warn("API direct chat failed. Falling back to premium local support assistant engine:", err);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessages((prev) => [...prev, { role: "lucas", content: getLocalSupportResponse(userMessage) }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const msg = inputValue.trim();
    setInputValue("");
    handleSendQuery(msg);
  };

  return (
    <>
      {/* Mini floating launcher icon on the bottom-left */}
      <div 
        id="ai-chatbot-root"
        className="fixed bottom-24 md:bottom-6 left-6 z-50 flex flex-col items-start pointer-events-none"
      >
        <AnimatePresence>
          {!isOpen && isLauncherVisible && (
            <motion.button
              id="ai-chatbot-launcher-btn"
              onClick={() => setIsOpen(true)}
              initial={{ x: -100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto relative w-11 h-11 bg-[#3D4A3E] text-[#82D8C5] rounded-full flex items-center justify-center shadow-2xl cursor-pointer border border-[#3D4A3E]/10 hover:bg-[#2C362D] transition-colors group"
              title="Speak with Lucas at H Salon Support"
            >
              {/* Pulsing indicator ring */}
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border border-white flex items-center justify-center animate-bounce">
                <span className="relative block w-1.5 h-1.5 rounded-full bg-white"></span>
              </span>
              
              {/* Sparking glow indicator */}
              <span className="absolute inset-0 rounded-full bg-[#82D8C5]/10 animate-ping pointer-events-none" />

              <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6 text-[#82D8C5]" />
              
              {/* Cute hover text bubble pointing to the button (placed to the right of launcher since it is left aligned) */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white text-brand-black text-[10px] font-sans font-black tracking-widest uppercase px-3 py-1.5 rounded-xl border border-brand-black/5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:block">
                Chat Live with Lucas
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
              className="pointer-events-auto w-[360px] sm:w-[400px] h-[540px] bg-white rounded-[32px] border border-brand-black/10 overflow-hidden shadow-2xl flex flex-col text-left mt-2 font-sans"
            >
              {/* Header section with Lucas support profile */}
              <div className="bg-[#3D4A3E] px-6 py-5 flex items-center justify-between border-b border-[#3D4A3E]/20 text-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="w-10 h-10 rounded-full bg-[#82D8C5]/20 border border-[#82D8C5]/30 flex items-center justify-center font-sans font-black text-[#82D8C5] text-[13px] tracking-wider uppercase select-none">
                      L
                    </span>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#3D4A3E] rounded-full animate-pulse" />
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
                {messages.map((msg, index) => {
                  const recommendedProds = msg.role === "lucas" ? findRecommendedProducts(msg.content) : [];
                  return (
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

                      {/* Render Interactive Product recommendation cards right underneath if matching */}
                      {recommendedProds.length > 0 && (
                        <div className="mt-2.5 w-full max-w-[85%] flex flex-col gap-2 animate-fade-in">
                          {recommendedProds.map((product) => (
                            <div 
                              key={product.id} 
                              className="bg-white border border-[#3D4A3E]/10 hover:border-[#3D4A3E]/30 rounded-2xl p-2.5 flex gap-2.5 items-center shadow-xs transition-all duration-300"
                            >
                              <img 
                                src={product.images[0]} 
                                alt={product.name} 
                                className="w-11 h-11 rounded-xl object-cover bg-[#FCFAF7] border border-brand-black/5 shrink-0" 
                                referrerPolicy="no-referrer" 
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="font-sans font-extrabold text-[10px] text-brand-black uppercase tracking-tight truncate">{product.name}</h5>
                                <p className="font-mono text-[9px] font-bold text-[#3D4A3E] mt-0.5">{formatPrice(product.price, state.currency)}</p>
                              </div>
                              <div className="flex flex-col gap-1 shrink-0">
                                <button
                                  onClick={() => handleAddToCart(product, 1)}
                                  className="bg-[#3D4A3E] hover:bg-[#82D8C5] text-[#82D8C5] hover:text-brand-black text-[8px] font-sans font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <ShoppingBag className="w-2.5 h-2.5 shrink-0" />
                                  <span>Add</span>
                                </button>
                                <button
                                  onClick={() => {
                                    handleSelectProduct(product.id);
                                    setIsOpen(false);
                                  }}
                                  className="bg-[#FCFAF7] hover:bg-brand-black/5 text-brand-black border border-brand-black/10 text-[8px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-center"
                                >
                                  <Eye className="w-2.5 h-2.5 shrink-0" />
                                  <span>View</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <span className="text-[8px] font-sans font-bold tracking-wider text-gray-400 uppercase mt-1 px-1">
                        {msg.role === "user" ? "YOU" : "LUCAS"}
                      </span>
                    </div>
                  );
                })}

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

              {/* Curated Interactive Topic pills */}
              <div className="px-4 py-2 bg-[#FCFAF7] border-t border-brand-black/5 flex gap-2 overflow-x-auto shrink-0 select-none no-scrollbar items-center">
                <span className="text-[8.5px] font-sans font-black uppercase tracking-widest text-[#3D4A3E]/50 shrink-0">Topics:</span>
                {CHOSEN_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSendQuery(topic.query)}
                    className="px-3 py-1.5 bg-white hover:bg-[#3D4A3E] text-[#3D4A3E] hover:text-white disabled:opacity-60 disabled:hover:bg-white disabled:hover:text-[#3D4A3E] border border-[#3D4A3E]/10 hover:border-[#3D4A3E]/20 rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-2xs"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>

              {/* Bottom sending input form */}
              <form
                id="ai-chatbot-input-form"
                onSubmit={handleSubmitForm}
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
