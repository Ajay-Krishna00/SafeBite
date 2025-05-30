import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export const askAI = async (productData, userProfile) => {

  const prompt = `
User has the following health profile:
- Allergies: ${userProfile.allergies.join(", ")}
- Medical Conditions: ${userProfile.conditions.join(", ")}

Based on the following product data, summarize whether this product is safe or risky for them. Explain briefly:

${JSON.stringify(productData, null, 2)}
  `;

  const MSG = [
    {
      role: "system",
      content: `You are a helpful assistant that provides summaries about food products. Be concise and health-focused.`,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const AIResponse = await groq.chat.completions.create({
    messages: MSG,
    model: "deepseek-r1-distill-llama-70b",
  });

  return AIResponse.choices[0].message.content;
};
