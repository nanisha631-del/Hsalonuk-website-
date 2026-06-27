import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, AlertCircle, ShoppingBag, Eye, Sparkles, RefreshCw, HelpCircle } from "lucide-react";
import { useSharedState, formatPrice } from "../useSharedState";
import { PRODUCTS } from "../data";
import { Product } from "../types";

interface ChatMessage {
  role: "user" | "agent" | "system";
  content: string;
}

interface Agent {
  name: string;
  role: string;
  initial: string;
  avatarBg: string; // Tailwind background color
  textColor: string; // Tailwind text color
  greeting: string;
}

const AGENTS: Agent[] = [
  {
    name: "Sophia",
    role: "Prestige Hair Therapist",
    initial: "S",
    avatarBg: "bg-[#82D8C5]",
    textColor: "text-brand-black",
    greeting: "Welcome to H Salon London! I am Sophia, prestige hair therapist. I'm absolutely delighted to assist you with custom scalp diagnostics, luxurious formulas, or order tracking. How can I perfect your hair ritual today?"
  },
  {
    name: "Oliver",
    role: "Botanical Formula Specialist",
    initial: "O",
    avatarBg: "bg-[#3D4A3E]",
    textColor: "text-[#82D8C5]",
    greeting: "Greetings! I'm Oliver, botanical formula specialist at H Salon, Mayfair. If you're inquiring about scalp tension, organic bio-nutrients, active discounts, or order status, I am here to assist. What can I solve for you?"
  },
  {
    name: "Emma",
    role: "Concierge & Ritual Guide",
    initial: "E",
    avatarBg: "bg-[#0A0A0A]",
    textColor: "text-[#82D8C5]",
    greeting: "Hello! I'm Emma, your H Salon concierge and ritual guide. I'm here to ensure your scalp health and luxury shopping experience is completely flawless. Ask me about our premium collections, custom coupon codes, or tracking!"
  },
  {
    name: "Lucas",
    role: "Scalp Wellness Specialist",
    initial: "L",
    avatarBg: "bg-emerald-100",
    textColor: "text-[#3D4A3E]",
    greeting: "Hello! I am Lucas, live support specialist at H Salon, London. What custom self-care guidance or luxury formula recommendations can I offer you today? Tap one of our curated topics below to begin!"
  },
  {
    name: "Isabella",
    role: "Salon Experience Coordinator",
    initial: "I",
    avatarBg: "bg-amber-100",
    textColor: "text-amber-900",
    greeting: "Welcome to H Salon! I am Isabella, your dedicated experience coordinator. I'm online to assist you with order status, tracking, special discounts like WELCOME10, or product queries. How may I serve you today?"
  }
];

const CHOSEN_TOPICS = [
  { id: "dry-scalp", label: "Dry/Flaky Scalp", query: "I have a dry and flaky scalp. What products do you recommend?" },
  { id: "hair-loss", label: "Hair Shedding", query: "I am experiencing hair shedding and thinning. What can I use?" },
  { id: "tension", label: "Scalp Tension", query: "How do I relieve scalp tension and stress?" },
  { id: "damage", label: "Split Ends & Heat", query: "My hair has split ends and heat damage, what do you suggest?" },
  { id: "discount", label: "Discounts & Promos", query: "What active discounts, coupon codes, and promo offers do you have?" },
  { id: "tracking", label: "Track My Order", query: "How do I track my order and check delivery status?" },
  { id: "location", label: "Flagship Mayfair", query: "Where is your flagship London salon located and what are your hours?" }
];

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<Agent>(AGENTS[0]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [isLauncherVisible, setIsLauncherVisible] = useState(false);

  const { state, handleAddToCart, handleSelectProduct } = useSharedState();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isConnecting]);

  // Entrance delay for the floating button
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsLauncherVisible(true);
    }, 2000);

    const interval = setInterval(() => {
      setIsLauncherVisible(false);
      setTimeout(() => {
        setIsLauncherVisible(true);
      }, 3500);
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Initialize or Reset support chat with a randomized representative
  const startNewChatSession = () => {
    setIsConnecting(true);
    setErrorStatus(null);
    setMessages([]);

    // Select a random agent different from the current one to ensure dynamic feeling
    const availableAgents = AGENTS.filter(a => a.name !== activeAgent.name);
    const chosen = availableAgents[Math.floor(Math.random() * availableAgents.length)] || AGENTS[0];
    setActiveAgent(chosen);

    // Simulate luxury concierge routing
    setTimeout(() => {
      setIsConnecting(false);
      setMessages([
        {
          role: "system",
          content: `Live bridge established with H Salon Mayfair. ${chosen.name} is now online to assist you.`
        },
        {
          role: "agent",
          content: chosen.greeting
        }
      ]);
    }, 1200);
  };

  // Run startNewChatSession when support pane is opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startNewChatSession();
    }
  }, [isOpen]);

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

  // Fully non-repetitive local fallback engine
  const getLocalSupportResponse = (msg: string): string => {
    const cleanMsg = msg.toLowerCase();
    
    // Determine if a topic was already discussed in messages to avoid repeating
    const histStr = messages.map(m => m.content.toLowerCase()).join(" ");
    const isRepeat = (keyword: string) => histStr.includes(keyword);

    // 1. Delivery & Shipping
    if (cleanMsg.includes("deliver") || cleanMsg.includes("shipping") || cleanMsg.includes("ship") || cleanMsg.includes("how long") || cleanMsg.includes("transit") || cleanMsg.includes("arrive") || cleanMsg.includes("postage") || cleanMsg.includes("days")) {
      if (isRepeat("ship") || isRepeat("deliver") || isRepeat("dhl")) {
        return `As I mentioned just moments ago, we dispatch all orders directly from our Mayfair, London flagship boutique via DHL Express. Do you have a specific UK or global delivery address in mind, or can I help you check out with one of our scalp rituals today?`;
      }
      return `Our premium collections are hand-packaged and shipped directly from Mayfair, London via DHL Express. UK orders arrive in 1–2 business days, while international deliveries to the USA, Canada, Europe, Australia, India, or UAE take just 3–5 business days. Once your package is on its way, you will receive a tracking link via email!`;
    }
    
    // 2. Returns & Refunds
    if (cleanMsg.includes("refund") || cleanMsg.includes("return") || cleanMsg.includes("exchange") || cleanMsg.includes("guarantee") || cleanMsg.includes("cancel") || cleanMsg.includes("wrong item")) {
      if (isRepeat("refund") || isRepeat("return") || isRepeat("concierge")) {
        return `Just to reiterate, your absolute satisfaction with your hair wellness ritual is our priority. If you need any assistance with a refund, simply reach us at concierge@hsalon.london and we'll send a prepaid return label. Is there a specific product that didn't align with your goals?`;
      }
      return `We offer a 30-day luxury satisfaction guarantee. If any formula doesn't align perfectly with your hair wellness ritual, you are welcome to return or exchange it in its original packaging within 30 days. Simply email our concierge at concierge@hsalon.london, and we'll dispatch a complimentary prepaid return label immediately.`;
    }
    
    // 3. Contact & Location & Flagship Hours
    if (cleanMsg.includes("where") || cleanMsg.includes("located") || cleanMsg.includes("location") || cleanMsg.includes("address") || cleanMsg.includes("salon") || cleanMsg.includes("london") || cleanMsg.includes("phone") || cleanMsg.includes("call") || cleanMsg.includes("store") || cleanMsg.includes("studio") || cleanMsg.includes("contact")) {
      if (isRepeat("located") || isRepeat("mayfair") || isRepeat("bruton")) {
        return `To help you find us, we are located right at 32 Bruton Place, Mayfair, London W1J 6NP. We're open Monday to Saturday from 9:00 AM to 8:00 PM. Would you like to schedule a customized scalp assessment or head spa experience?`;
      }
      return `Our physical flagship boutique and head spa therapy studio are situated in the heart of Mayfair, London, at 32 Bruton Place, Mayfair, London W1J 6NP. For personalized concierge booking, inquiries, or custom orders, you can reach our team at concierge@hsalon.london or call us directly at +44 20 7946 0192.`;
    }

    // 4. Discounts & Promo Codes & Offers
    if (cleanMsg.includes("discount") || cleanMsg.includes("promo") || cleanMsg.includes("coupon") || cleanMsg.includes("code") || cleanMsg.includes("offer") || cleanMsg.includes("sale")) {
      if (isRepeat("discount") || isRepeat("welcome10") || isRepeat("promo")) {
        return `In addition to our active coupon **WELCOME10** for 10% off, we also offer the coupon **SCALPSILK** which grants 15% off any individual scalp treatment or scalp masque! Free tracked shipping is also applied automatically to all orders over ₹4000 INR.`;
      }
      return `We have an exclusive 10% welcome discount for our online clients! You can use code **WELCOME10** at checkout for 10% off your entire first purchase. We also offer free shipping on orders above ₹4000 INR (approx £40 / $50 USD)!`;
    }

    // 5. Order Tracking & Track Order
    if (cleanMsg.includes("track") || cleanMsg.includes("status") || cleanMsg.includes("order") || cleanMsg.includes("where is my")) {
      if (isRepeat("track") || isRepeat("status") || isRepeat("dhl")) {
        return `You can track all order dispatches in real-time. Simply click the tracking link in your dispatch email or log into your H Salon account profile to view live shipping milestones. Do you have an order number I can check for you?`;
      }
      return `You can track your orders instantly! Since you are logged in, you can view your real-time shipping milestones under the 'Track Order' option in your account profile. Every package is processed within 12 hours and sent via fully tracked DHL Express.`;
    }
    
    // 6. Authenticity & Formulas
    if (cleanMsg.includes("organic") || cleanMsg.includes("natural") || cleanMsg.includes("botanical") || cleanMsg.includes("authentic") || cleanMsg.includes("ingredients") || cleanMsg.includes("real") || cleanMsg.includes("animal") || cleanMsg.includes("tested") || cleanMsg.includes("vegan")) {
      return `Rest assured that every bottle we sell is 100% authentic, fresh from prestige London and French laboratories. Our botanical mixtures combine bio-fermented hair nutrients with pure cold-pressed oils. Every formula is entirely cruelty-free and dermatologically certified.`;
    }

    // 7. Scalp specific
    if (cleanMsg.includes("dry") || cleanMsg.includes("flake") || cleanMsg.includes("dandruff") || cleanMsg.includes("itch") || cleanMsg.includes("irritation") || cleanMsg.includes("scalp")) {
      if (isRepeat("scalp") || isRepeat("dry") || isRepeat("oribe")) {
        return `For persistent flaking or irritation, our clinical scalp assessment recommends applying 'Oribe Serene Scalp Treatment' daily directly onto damp scalp. I've placed the direct checkout link right below your screen so you can purchase it with one click!`;
      }
      return `I completely understand how frustrating scalp flaking or dryness can be! I highly recommend our soothing 'Oribe Serene Scalp Treatment' to cool itchiness, paired with the luxurious 'Oribe Serene Scalp Masque' to deeply hydrate. I've provided their direct product links below so you can add them to your cart instantly!`;
    } 
    
    // 8. Hair fall / Growth
    if (cleanMsg.includes("hair fall") || cleanMsg.includes("shedding") || cleanMsg.includes("thinning") || cleanMsg.includes("loss") || cleanMsg.includes("fall") || cleanMsg.includes("grow") || cleanMsg.includes("growth")) {
      if (isRepeat("shedding") || isRepeat("hair oil") || isRepeat("lust")) {
        return `To best treat active shedding, massage 3-4 drops of 'Oribe Gold Lust Hair Oil' into your roots every evening to fortify your hair follicles. Check out the direct product link provided below to get started!`;
      }
      return `Dealing with hair shedding and thinning can be discouraging, but our premium 'Oribe Gold Lust Hair Oil' delivers intense nourishment to fortify hair fibers. Pair it with the 'Kérastase Chronologiste Caviar Serum' to regenerate your hair vitality. I've placed their direct add-to-cart links below to help you get started right away!`;
    } 
    
    // 9. Tension & Stress relief
    if (cleanMsg.includes("tension") || cleanMsg.includes("headache") || cleanMsg.includes("stress") || cleanMsg.includes("relax") || cleanMsg.includes("massage") || cleanMsg.includes("sleep")) {
      return `To dissolve deep facial tension and support a restful night, nothing compares to the 'Ground Wellbeing Sleep Face Balm' combined with the soothing organic botanical extracts of 'The Recovery Face Oil'. I have provided direct product links below so you can easily add them and start your evening ritual!`;
    } 
    
    // 10. Muscle / Body Care
    if (cleanMsg.includes("muscle") || cleanMsg.includes("body") || cleanMsg.includes("active") || cleanMsg.includes("workout") || cleanMsg.includes("sport") || cleanMsg.includes("pain")) {
      return `For active recovery and deep muscle stimulation, 'The Active Body Oil' is magnificent. It contains Eucalyptus, Black Pepper, and Ginger to soothe sore muscles. You can view its details or add it to your cart using the link below!`;
    } 
    
    // 11. Heat Damage & Split ends
    if (cleanMsg.includes("damage") || cleanMsg.includes("split") || cleanMsg.includes("heat") || cleanMsg.includes("dry hair")) {
      return `To repair split ends and protect your hair from heat damage, I highly recommend 'Kérastase Nutritive Split-End Serum' or the 'Olaplex No. 9 Bond Protector Serum'. I've listed both of these advanced formulas below for quick access!`;
    } 
    
    // 12. Accessories & Apparel
    if (cleanMsg.includes("cap") || cleanMsg.includes("comb") || cleanMsg.includes("accessories") || cleanMsg.includes("bag")) {
      return `Our lifestyle accessories are superb! Style and protect your hair with our signature organic cotton 'H Salon Signature Styling Cap' or detangle gently with the hand-carved 'H Salon Luxury Texture Comb'. The direct product details and add-to-cart links are available below!`;
    } 
    
    // 13. Routine bundles
    if (cleanMsg.includes("bundle") || cleanMsg.includes("all") || cleanMsg.includes("routine") || cleanMsg.includes("complete") || cleanMsg.includes("ritual")) {
      return `For the ultimate crown revival, we suggest our premium 'Oribe Serene Scalp Treatment' and 'Oribe Gold Lust Hair Oil'. Check out the direct product options below to add them directly to your cart and build your ritual!`;
    } 
    
    // 14. Politeness / Thanks
    if (cleanMsg.includes("thank") || cleanMsg.includes("thanks") || cleanMsg.includes("great") || cleanMsg.includes("perfect") || cleanMsg.includes("awesome") || cleanMsg.includes("ok")) {
      return `It is an absolute honor to assist you! Please check out the recommended product links below so you can easily find them and add them to your cart. Let me know if you need any other guidance.`;
    } 
    
    // 15. General greetings
    if (cleanMsg.includes("hello") || cleanMsg.includes("hi") || cleanMsg.includes("hey") || cleanMsg.includes("morning") || cleanMsg.includes("afternoon") || cleanMsg.includes("evening")) {
      return `Hello! Welcome to H Salon live support, London. I am ${activeAgent.name}, your personal scalp therapist and concierge. How may I assist you with your hair wellness journey today?`;
    }

    // Default human fallback
    return `I would be absolutely delighted to assist you with that! Our Mayfair boutique is fully stocked with premium dermatologist-tested hair care and relaxation aids. Could you please share a bit more about your hair concerns or skin type so I can recommend the exact formula and send you the direct add-to-cart link?`;
  };

  const handleSendQuery = async (userMessage: string) => {
    if (isLoading || isConnecting) return;
    setErrorStatus(null);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const formattedHistory = messages
        .filter(m => m.role !== "system")
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          content: msg.content
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: formattedHistory,
          agentName: activeAgent.name
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
      
      // Calculate typing delay proportional to message length to simulate a real human
      const messageLength = data.reply.length;
      const typingDelay = Math.min(Math.max(messageLength * 12, 1200), 2800);
      
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "agent", content: data.reply }]);
        setIsLoading(false);
      }, typingDelay);

    } catch (err: any) {
      console.warn("API direct chat failed. Falling back to premium local support assistant engine:", err);
      
      const fallbackReply = getLocalSupportResponse(userMessage);
      const typingDelay = Math.min(Math.max(fallbackReply.length * 12, 1200), 2800);
      
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "agent", content: fallbackReply }]);
        setIsLoading(false);
      }, typingDelay);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || isConnecting) return;
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto relative w-12 h-12 bg-brand-black text-[#82D8C5] rounded-full flex items-center justify-center shadow-2xl cursor-pointer border border-[#82D8C5]/20 hover:bg-[#121212] hover:border-[#82D8C5]/50 transition-all duration-300 group"
              title={`Speak with ${activeAgent.name} at H Salon Support`}
            >
              {/* Always Live badge pulse */}
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#82D8C5] rounded-full border border-black flex items-center justify-center animate-pulse">
                <span className="relative block w-1.5 h-1.5 rounded-full bg-brand-black"></span>
              </span>
              
              {/* Sparking glow indicator */}
              <span className="absolute inset-0 rounded-full bg-[#82D8C5]/10 animate-ping pointer-events-none" />

              <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6 text-[#82D8C5]" />
              
              {/* Dynamic hover bubble */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-brand-black text-[#82D8C5] text-[10px] font-sans font-black tracking-widest uppercase px-3.5 py-2 rounded-xl border border-[#82D8C5]/20 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap hidden sm:block">
                Chat Live with {activeAgent.name}
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Active Chat Windows Container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="ai-chatbot-window"
              initial={{ opacity: 0, scale: 0.9, y: 80 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 80 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-[360px] sm:w-[420px] h-[580px] bg-[#FCFAF7] rounded-[28px] border border-brand-black/15 overflow-hidden shadow-2xl flex flex-col text-left mt-2 font-sans"
            >
              {/* Aesthetic Header with dynamic support profile */}
              <div className="bg-brand-black px-6 py-5 flex items-center justify-between border-b border-brand-black/20 text-white shrink-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#82D8C5]/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center gap-3.5 z-10">
                  <div className="relative">
                    <span className={`w-11 h-11 rounded-full ${activeAgent.avatarBg} ${activeAgent.textColor} border border-white/10 flex items-center justify-center font-sans font-black text-[15px] tracking-wider uppercase select-none shadow-md`}>
                      {activeAgent.initial}
                    </span>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-brand-black rounded-full animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-sans font-black uppercase text-[13px] tracking-widest text-white leading-none">
                        {activeAgent.name}
                      </h4>
                      <span className="px-1.5 py-0.5 bg-[#82D8C5]/10 border border-[#82D8C5]/20 text-[#82D8C5] text-[7.5px] font-sans font-black tracking-widest rounded uppercase leading-none">
                        Live
                      </span>
                    </div>
                    <span className="text-[9.5px] font-sans font-bold tracking-wider text-gray-400 block uppercase mt-1">
                      {activeAgent.role} • H Salon Mayfair
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 z-10">
                  {/* Rotate / New Chat Button */}
                  <button
                    id="ai-chatbot-reset-btn"
                    onClick={startNewChatSession}
                    disabled={isConnecting || isLoading}
                    title="Connect with another team member"
                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-[#82D8C5] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className={`w-4 h-4 ${isConnecting ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    id="ai-chatbot-close-btn"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat messages dialogue section */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#FCFAF7] space-y-4 scroll-smooth">
                {isConnecting ? (
                  /* Premium Connecting Simulator State */
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3.5 px-4 animate-pulse">
                    <div className="relative">
                      <span className="w-14 h-14 rounded-full bg-brand-black border border-[#82D8C5]/30 flex items-center justify-center text-[#82D8C5] animate-spin">
                        <RefreshCw className="w-6 h-6" />
                      </span>
                      <span className="absolute -inset-1.5 rounded-full border border-[#82D8C5]/20 animate-ping pointer-events-none" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-sans font-black text-[11px] text-brand-black uppercase tracking-widest">Routing Connection</h5>
                      <p className="font-sans text-[10px] text-brand-black/60 tracking-wider">Connecting you safely with our H Salon Mayfair concierge team...</p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isSystem = msg.role === "system";
                    const recommendedProds = msg.role === "agent" ? findRecommendedProducts(msg.content) : [];
                    
                    if (isSystem) {
                      return (
                        <div key={index} className="flex justify-center my-3.5">
                          <div className="bg-brand-black/5 border border-brand-black/5 rounded-full px-4 py-1.5 text-[9.5px] font-sans font-bold text-brand-black/55 tracking-wider uppercase text-center max-w-[90%]">
                            {msg.content}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={index}
                        className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-[20px] px-4.5 py-3 text-[12.5px] font-sans leading-relaxed shadow-2xs ${
                            msg.role === "user"
                              ? "bg-brand-black text-white rounded-br-none border border-brand-black"
                              : "bg-white text-brand-black rounded-bl-none border border-brand-black/10"
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
                                className="bg-white border border-[#3D4A3E]/10 hover:border-brand-black/25 rounded-2xl p-2.5 flex gap-2.5 items-center shadow-xs transition-all duration-300"
                              >
                                <img 
                                  src={product.images[0]} 
                                  alt={product.name} 
                                  className="w-12 h-12 rounded-xl object-cover bg-[#FCFAF7] border border-brand-black/5 shrink-0" 
                                  referrerPolicy="no-referrer" 
                                />
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-sans font-black text-[10.5px] text-brand-black uppercase tracking-tight truncate">{product.name}</h5>
                                  <p className="font-mono text-[9px] font-bold text-[#3D4A3E] mt-0.5">{formatPrice(product.price, state.currency)}</p>
                                </div>
                                <div className="flex flex-col gap-1 shrink-0">
                                  <button
                                    onClick={() => handleAddToCart(product, 1)}
                                    className="bg-brand-black hover:bg-[#82D8C5] text-white hover:text-brand-black text-[8px] font-sans font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
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

                        <span className="text-[8px] font-sans font-bold tracking-widest text-brand-black/35 uppercase mt-1 px-1">
                          {msg.role === "user" ? "Client" : activeAgent.name}
                        </span>
                      </div>
                    );
                  })
                )}

                {isLoading && (
                  <div className="flex flex-col items-start">
                    <div className="bg-white rounded-[20px] rounded-bl-none px-4.5 py-3 border border-brand-black/10 flex items-center gap-1.5 shadow-2xs">
                      <span className="w-1.5 h-1.5 bg-brand-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[8px] font-sans font-bold tracking-widest text-brand-black/35 uppercase mt-1 px-1">
                      {activeAgent.name} is typing...
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

              {/* Interactive curated Topic pill drawer */}
              <div className="px-4 py-2 bg-white border-t border-brand-black/10 flex gap-2 overflow-x-auto shrink-0 select-none no-scrollbar items-center">
                <span className="text-[8.5px] font-sans font-black uppercase tracking-widest text-brand-black/40 shrink-0">Topics:</span>
                {CHOSEN_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    disabled={isLoading || isConnecting}
                    onClick={() => handleSendQuery(topic.query)}
                    className="px-3 py-1.5 bg-[#FCFAF7] hover:bg-brand-black text-brand-black hover:text-[#82D8C5] disabled:opacity-50 border border-brand-black/10 hover:border-brand-black rounded-full text-[9px] font-sans font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer shrink-0"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>

              {/* Elegant dynamic input field */}
              <form
                id="ai-chatbot-input-form"
                onSubmit={handleSubmitForm}
                className="p-4 border-t border-brand-black/10 bg-white shrink-0 flex gap-2.5 items-center"
              >
                <input
                  id="ai-chatbot-input-field"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Inquire with ${activeAgent.name} about scalp rituals, tracking, codes...`}
                  className="flex-1 bg-[#FCFAF7] border border-brand-black/10 focus:border-brand-black focus:outline-none rounded-xl px-4 py-3 text-[12px] font-sans text-brand-black placeholder-gray-400 transition-colors"
                  disabled={isLoading || isConnecting}
                  autoComplete="off"
                />
                <button
                  id="ai-chatbot-send-btn"
                  type="submit"
                  disabled={!inputValue.trim() || isLoading || isConnecting}
                  className="w-[42px] h-[42px] rounded-xl bg-brand-black text-[#82D8C5] flex items-center justify-center hover:bg-black disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95"
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
