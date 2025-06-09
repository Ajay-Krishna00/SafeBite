const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY3 || "",
});

const askAI = async (productData, userProfile) => {
  const prompt = `
User profile:
- Allergies: ${userProfile.allergies.join(", ")}
- Conditions: ${userProfile.conditions.join(", ")}

Product data:
${JSON.stringify(productData, null, 2)}


Summarize if this product is safe or risky for the user. Be brief but clear, and limit your response to a maximum of 70 words. Do not explain your reasoning. Only give the conclusion and, if necessary, a short suggestion or advice. Do NOT include markdown, code blocks, or bullet points.should have a heading "Overview from your data" in bold. 

As a second paragraph, write a general overview of the product that a 15-year-old can understand, using no more than 50 words.should have a heading "General Overview" in bold. 

You may only use italic or bold styling that is compatible with React Native <Text> components. No other formatting is allowed.
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

const consultAi = async (userProfile, filteredProductList) => {
  const prompt = `
  The user has the following constraints:
- Allergies: ${userProfile.allergies.join(", ")}
- Medications: ${userProfile.conditions.join(", ")}
- Dietary Restrictions: ${userProfile.dietary.join(", ")}

Here is a list of food product data fetched from OpenFoodFacts. Each item is an object with a product ID and its metadata.

${JSON.stringify(filteredProductList)}

Select and return only the IDs of products that are perfectly compatible with all the user's health details. Products should also be considered healthy. If fewer than 1 healthy products exist, return only perfectly compatible ones, even if not healthy.
Do not include any other text, explanations, or formatting. Only return the JSON array of product IDs.No markdown, code blocks, or bullet points. No additional text is allowed.

Output: A plain JSON array of product IDs, e.g.:
["1234567890123", "9876543210987", ...]
  `;

  const result = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are a JSON-only assistant. Output ONLY a valid JSON array of strings. Do NOT include extra text, markdown, explanations, or code blocks. Do not include trailing commas. Only a single valid array must be returned.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  const response = result.choices[0].message.content;

  // Extract JSON array using regex
  try {
    const match = response.match(/\[.*?\]/s);
    if (!match) throw new Error("AI response did not contain a JSON array");
    return JSON.parse(match[0]);
  } catch (err) {
    console.error("❌ Failed to parse AI response:");
    console.error("RAW:", response);
    throw err;
  }
};

module.exports = { askAI, consultAi };
