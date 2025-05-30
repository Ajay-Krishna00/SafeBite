const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const askAI = async (productData, userProfile) => {
  const prompt = `
User profile:
- Allergies: ${userProfile.allergies.join(", ")}
- Conditions: ${userProfile.conditions.join(", ")}

Product data:
${JSON.stringify(productData, null, 2)}

Summarize if this product is safe or risky. Be brief but clear. maximum of 50 words. Don't show your thinking process, just the conclusion and if necessary your suggestions. DO NOT include any markdown formatting or code blocks in your response.
`;

  const result = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You are a health AI assistant for analyzing food products.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return result.choices[0].message.content;
};

module.exports = { askAI };
