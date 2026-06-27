import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API routing first
  app.post("/api/chat", async (req, res) => {
    const { message, history, agentName = "Lucas" } = req.body;
    const cleanMessage = (message || "").toLowerCase().trim();
    
    // Helper function for ultra-premium simulated support response that doesn't repeat answers
    const getFallbackSupportResponse = (msg: string, hist: any[] = []): string => {
      const cleanMsg = msg.toLowerCase();
      
      // Determine if a topic was already discussed in history to avoid repeating
      const histStr = hist.map(h => (h.content || "").toLowerCase()).join(" ");
      const isRepeat = (keyword: string) => histStr.includes(keyword);

      // 1. Delivery & Shipping
      if (cleanMsg.includes("deliver") || cleanMsg.includes("shipping") || cleanMsg.includes("ship") || cleanMsg.includes("how long") || cleanMsg.includes("transit") || cleanMsg.includes("arrive") || cleanMsg.includes("postage") || cleanMsg.includes("days")) {
        if (isRepeat("ship") || isRepeat("deliver") || isRepeat("dhl")) {
          return `As I mentioned just moments ago, we dispatch all orders directly from our Mayfair, London flagship boutique via DHL Express. Do you have a specific UK or global delivery address in mind, or can I help you check out with one of our scalp rituals today?`;
        }
        return `All premium collections are hand-packaged and shipped directly from Mayfair, London via DHL Express. UK orders arrive in 1–2 business days, while international deliveries to the USA, Canada, Europe, Australia, India, or UAE take just 3–5 business days. Once dispatched, you will receive a tracking link via email!`;
      }
      
      // 2. Returns & Refunds
      if (cleanMsg.includes("refund") || cleanMsg.includes("return") || cleanMsg.includes("exchange") || cleanMsg.includes("guarantee") || cleanMsg.includes("cancel") || cleanMsg.includes("wrong item")) {
        if (isRepeat("refund") || isRepeat("return") || isRepeat("concierge")) {
          return `Just to reiterate, your absolute satisfaction with your hair wellness ritual is our priority. If you need any assistance with a refund, simply reach us at concierge@hsalon.london and we'll send a prepaid return label. Is there a specific product that didn't align with your goals?`;
        }
        return `We offer a 30-day luxury satisfaction guarantee. If any formula doesn't align perfectly with your hair wellness ritual, you are welcome to return or exchange it in its original packaging within 30 days. Simply email our concierge at concierge@hsalon.london, and we'll dispatch a complimentary prepaid return label immediately.`;
      }
      
      // 3. Contact & Location & Flagship
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
      if (cleanMsg.includes("cap") || cleanMsg.includes("comb") || cleanMsg.includes("accessories") || cleanMsg.includes("bag") || cleanMsg.includes("pouch")) {
        return `Our lifestyle accessories are superb! Safeguard your glass dropper bottles in 'The Velvet Spa Kit Pouch' and look chic in our signature organic cotton 'H Salon Signature Styling Cap'. The direct product details and add-to-cart links are available below!`;
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
        return `Hello! Welcome to H Salon live support, London. I am ${agentName}, your personal scalp therapist and concierge. How may I assist you with your hair wellness journey today?`;
      }

      // Default human fallback
      return `I would be absolutely delighted to assist you with that! Our Mayfair boutique is fully stocked with premium dermatologist-tested hair care and relaxation aids. Could you please share a bit more about your hair concerns or skin type so I can recommend the exact formula and send you the direct add-to-cart link?`;
    };

    try {
      const apiKey = process.env.GEMINI_API_KEY;

      // Handle missing API Key or fallback simulation gracefully to prevent frustrating support errors in shared previews
      if (!apiKey || apiKey.trim() === "" || apiKey.includes("YOUR_") || apiKey.includes("PLACEHOLDER")) {
        console.log(`GEMINI_API_KEY not defined or placeholder. Initiating H Salon Support simulator response with agent ${agentName}...`);
        await new Promise((resolve) => setTimeout(resolve, 800));
        return res.json({ reply: getFallbackSupportResponse(cleanMessage, history) });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      // System instruction customized to selected Agent name, website features, discounts, tracking, location, etc.
      const systemInstruction = 
        `You are ${agentName}, a welcoming, helpful, and realistic customer support specialist at H Salon, London, UK. ` +
        `You provide live chat support for premium scalp-care, hair-oils, and botanical recovery products. ` +
        `Answer in a warm, polite, conversational, human-like manner. Avoid robotic preambles, formatting structures like lists or bullets, or dry listings. ` +
        `Talk precisely like an expert salon therapist - attentive and luxurious. ` +
        `Keep your replies relatively short (maximum 2-3 sentences), concise, and elegant. ` +
        `You must never repeat previous answers. Pay close attention to the conversation history to provide progressive, helpful responses rather than repeating details. ` +
        `Under no circumstances say 'as an AI' or 'as a model'. Speak entirely as a real human specialist from our Mayfair boutique. ` +
        `Make sure to incorporate relevant information when asked: ` +
        `- Store Location: 32 Bruton Place, Mayfair, London W1J 6NP (open Mon-Sat 9am-8pm, Sun 11am-6pm). ` +
        `- Discounts: Use code 'WELCOME10' for 10% off your first purchase, or 'SCALPSILK' for 15% off scalp treatments & masques. ` +
        `- Tracking Orders: Clients can view live shipping status directly under the 'Track Order' option in their profile tab or using the DHL Express tracking link emailed. Hand-packaged and sent within 12 hours from Mayfair. UK takes 1-2 days, worldwide takes 3-5 days. ` +
        `When recommending products, ALWAYS mention their exact names so our system can detect them and generate direct clickable shopping links for the client below your message. ` +
        `Our catalog names are exactly: ` +
        `1. 'Oribe Serene Scalp Treatment' for dry/flaky/itchy scalp or scalp irritation. ` +
        `2. 'Oribe Serene Scalp Masque' for deep scalp hydration, flake reduction, and conditioning. ` +
        `3. 'Oribe Gold Lust Hair Oil' for luxury hair oil, intense shine, hair defense, and splitting ends. ` +
        `4. 'The Recovery Face Oil' for overnight barrier repair, tired skin, and organic evening rituals. ` +
        `5. 'The Active Body Oil' for post-workout athletic muscle recovery and aromatherapy stimulation. ` +
        `6. 'Kérastase Elixir Ultime Hair Oil' for high-performance shine, frizz control, and thermal heat protection. ` +
        `7. 'Oribe Power Drops Hydration Booster' for intensive hyaluronic acid dry scalp booster. ` +
        `8. 'Kérastase Chronologiste Caviar Serum' for premium regenerating scalp & hair pearls. ` +
        `9. 'Ground Wellbeing Sleep Face Balm' for nightly rest, facial tension relief, and sweet sleep. ` +
        `10. 'Olaplex No. 9 Bond Protector Serum' for anti-pollution damage protection hair shield. ` +
        `11. 'Kérastase Nutritive Split-End Serum' for dry hair tips, split-end sealing, and nutrition. ` +
        `12. 'The Velvet Spa Kit Pouch' for double-stitched velvet quilted travel zipper. ` +
        `13. 'H Salon Signature Styling Cap' for protective logo cap. ` +
        `Always recommend the real products from this list, and gently let the client know that you've placed direct product checkout and details links below your message so they don't have to search and can easily add them to their cart.`;

      const modelName = "gemini-3.5-flash";
      const chatHistory = history || [];
      const contents = [
        ...chatHistory.map((item: any) => ({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.content }]
        })),
        { role: "user", parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "";
      if (!replyText.trim()) {
        throw new Error("Received empty text answer from Gemini");
      }

      res.json({ reply: replyText });
    } catch (err: any) {
      console.warn("Gemini Chat API Error, falling back to Support Simulator:", err);
      // Fallback is 100% resilient and seamless to ensure amazing chat reliability
      return res.json({ reply: getFallbackSupportResponse(cleanMessage, history) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
