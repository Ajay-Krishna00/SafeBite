import express from "express";

const router = express.Router();

import Groq from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const askAI = async (productData: any, userProfile: any) => {
  const prompt = `
User has the following health profile:
- Allergies: ${userProfile.allergies.join(", ")}
- Medical Conditions: ${userProfile.conditions.join(", ")}

Based on the following product data, summarize whether this product is safe or risky for them. Be concise and highlight key risks or safe points.

${JSON.stringify(productData, null, 2)}
  `;

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are a helpful assistant that summarizes food products with health relevance.`,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const response = await groq.chat.completions.create({
    messages,
    model: "deepseek-r1-distill-llama-70b",
  });

  return response.choices[0].message.content;
};

router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const { userProfile, productData } = req.body;

    if (!userProfile || !productData) {
      return res.status(400).json({ error: "Missing user profile or product data" });
    }

    const summary = await askAI(productData, userProfile);
    res.json({ summary });
  } catch (error) {
    console.error("Error generating AI summary:", error);
    res.status(500).json({ error: "Failed to generate AI summary" });
  }
});

export default router;
