const express = require("express");
const { askAI } = require("../controllers/aiController");

const router = express.Router();

router.post("/", async (req, res) => {
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
