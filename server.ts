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
    try {
      const { message, history } = req.body;
      const cleanMessage = (message || "").toLowerCase().trim();
      const apiKey = process.env.GEMINI_API_KEY;

      // Handle missing API Key or fallback simulation gracefully to prevent frustrating support errors in shared previews
      if (!apiKey) {
        console.log("GEMINI_API_KEY is not defined. Initiating premium H Salon Support simulator response...");
        
        let reply = "";

        if (cleanMessage.includes("dry scalp") || cleanMessage.includes("flake") || cleanMessage.includes("dandruff") || cleanMessage.includes("itch") || cleanMessage.includes("dryness")) {
          reply = "I understand how uncomfortable a dry, flaking scalp can feel. I highly recommend our soothing Oribe Serene Scalp Treatment (£48) alongside the rich Serene Scalp Masque (£52) to immediately calm itchiness and restore your barrier.";
        } else if (cleanMessage.includes("hair fall") || cleanMessage.includes("shedding") || cleanMessage.includes("thinning") || cleanMessage.includes("loss") || cleanMessage.includes("fall")) {
          reply = "Dealing with hair shedding can be frustrating, but our premium peptide-enriched Hair Growth Set is designed to fortify weak fibers. Additionally, massaging with Oribe Gold Lust Hair Oil (£45) delivers instant active nourishment.";
        } else if (cleanMessage.includes("tension") || cleanMessage.includes("headache") || cleanMessage.includes("stress") || cleanMessage.includes("relax") || cleanMessage.includes("massage")) {
          reply = "For deep tension release, our Ground Wellbeing Sleep Face Balm (£68) works wonders. Combine it with a nightly 10-stroke scalp glide using our custom H Salon cap and hand-carved combs to ease daily meridian pressure.";
        } else if (cleanMessage.includes("bundle") || cleanMessage.includes("all") || cleanMessage.includes("routine") || cleanMessage.includes("complete") || cleanMessage.includes("ritual")) {
          reply = "To achieve the ultimate crown revival, the flagship Pure Balance Ritual bundle (£284) is magnificent. It unites the Lavender Snail Silk scalp mask, recovery oils, and sensory combs into one sovereign self-care regimen.";
        } else if (cleanMessage.includes("thank") || cleanMessage.includes("thanks") || cleanMessage.includes("great") || cleanMessage.includes("perfect") || cleanMessage.includes("awesome")) {
          reply = "You are most welcome! It is an absolute privilege assisting you. Please don't hesitate to reach back out if you require any further boutique treatment advice from London.";
        } else if (cleanMessage.includes("hello") || cleanMessage.includes("hi") || cleanMessage.includes("hey") || cleanMessage.includes("morning") || cleanMessage.includes("afternoon")) {
          reply = "Hello there! Welcome to H Salon live support. I am Lucas. Are you seeking custom relief tips for your scalp, or perhaps bespoke suggestions for our luxury hair oil formulas today?";
        } else {
          reply = "I would be absolutely delighted to help guide your routine. Our botanical formulas, like the Oribe Serene Scalp series and Gold Lust Oil, are fully optimized for delicate hair and scalp concerns. Could you share a bit more about your current hair type or skin goals?";
        }

        // Simulate a tiny, ultra-realistic human response time delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        return res.json({ reply });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      // System instruction for Lucas
      const systemInstruction = 
        "You are Lucas, an ultra-welcoming, highly helpful, and realistic human Customer Support Specialist at H Salon, London, UK. " +
        "You provide live chat support for premium scalp-care, hair-oils, and botanical recovery products. " +
        "Answer in a warm, empathetic, conversational, human-like manner. Avoid robotic preambles, artificial structures, or dry listings. " +
        "Talk precisely like an expert salon therapist - attentive and luxurious. " +
        "Keep your replies relatively short (maximum 2-3 sentences), concise, and elegant. " +
        "Reference our top formulas: Oribe Serene Scalp Treatment (£48), Oribe Serene Scalp Masque (£52), " +
        "Oribe Gold Lust Hair Oil (£45), Ground Wellbeing Sleep Face Balm (£68), and our flagship Pure Balance Ritual bundle (£284) " +
        "whenever clients ask about dry scalp flaking, tension release, routine tips, or high-end self-care gift sets.";

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

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error("Gemini Chat API Error:", err);
      res.status(500).json({ error: err.message || "An error occurred with chat generation." });
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
