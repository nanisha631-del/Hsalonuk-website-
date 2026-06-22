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
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not defined in the environment secrets. Please set it in Settings > Secrets." });
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
