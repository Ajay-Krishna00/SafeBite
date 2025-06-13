const express = require("express");
const { consultAi } = require("../controller/aiController");
const fs = require("fs");
const router = express.Router();
const hashProfile = require("../utils/hashProfile");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
const supabase = createClient(
  process.env.EXPO_PUBLIC_PROJECT_URL,
  process.env.EXPO_PUBLIC_PUBLIC_ANON_KEY,
);

function handleFilter(products, userProfile) {
  const { allergies = [], conditions = [], dietary = [] } = userProfile;

  return products.filter((product) => {
    const allergens = Array.isArray(product.allergens_tags) ? product.allergens_tags : [];
    const labels = Array.isArray(product.labels_tags) ? product.labels_tags : [];

    // ✅ 1. Filter allergens (e.g., en:gluten)
    const hasAllergens = allergies.some((allergy) => {
      if (allergy.toLowerCase().trim() === "none") return false;
      return allergens.includes(`en:${allergy.toLowerCase().trim()}`);
  });

    // ✅ 2. Filter dietary tags (e.g., en:vegan, en:vegetarian)
    const isDietRestricted = dietary.some((diet) => {
      if (diet.toLowerCase().trim() === "none") return false;
      return !labels.includes(`en:${diet.toLowerCase().trim()}`);
    });

    // ✅ 3. Filter based on medical conditions (this is tricky — basic version)
    // Example: avoid sugar if diabetic
    const conditionFails = conditions.some((condition) => {
      condition = condition.toLowerCase().trim();

      if (condition === "diabetes") {
        return (
          product.nutriments?.sugars_100g > 5 ||
          product.nutriments?.carbohydrates_100g > 20
        );
      }

      if (condition === "hypertension") {
        return (
          product.nutriments?.salt_100g > 0.3 ||
          product.nutriments?.sodium_100g > 0.12
        );
      }

      if (condition === "high cholesterol") {
        return (
          product.nutriments?.saturated_fat_100g > 2 ||
          product.nutriments?.trans_fat_100g > 0.1
        );
      }

      if (condition === "celiac disease") {
        return (
          product.ingredients_text?.toLowerCase().trim().includes("gluten") ||
          product.ingredients_text?.toLowerCase().trim().includes("wheat") ||
          product.ingredients_text?.toLowerCase().trim().includes("barley") ||
          product.ingredients_text?.toLowerCase().trim().includes("rye")
        );
      }

      if (condition === "lactose intolerance") {
        return (
          product.ingredients_text?.toLowerCase().trim().includes("milk") ||
          product.ingredients_text?.toLowerCase().trim().includes("lactose") ||
          product.ingredients_text?.toLowerCase().trim().includes("cheese") ||
          product.ingredients_text?.toLowerCase().trim().includes("butter")
        );
      }

      if (condition === "irritable bowel syndrome (ibs)") {
        return (
          product.ingredients_text?.toLowerCase().trim().includes("onion") ||
          product.ingredients_text?.toLowerCase().trim().includes("garlic") ||
          product.ingredients_text
            ?.toLowerCase().trim()
            .includes("artificial sweeteners")
        );
      }

      if (condition === "gout") {
        return (
          product.ingredients_text?.toLowerCase().trim().includes("red meat") ||
          product.ingredients_text?.toLowerCase().trim().includes("beer") ||
          product.ingredients_text?.toLowerCase().trim().includes("organ meat")
        );
      }

      if (condition === "kidney disease") {
        return (
          product.nutriments?.proteins_100g > 10 ||
          product.nutriments?.potassium_100g > 0.3
        );
      }

      if (condition === "heart disease") {
        return (
          product.nutriments?.salt_100g > 0.3 ||
          product.nutriments?.cholesterol_100g > 0.1
        );
      }

      if (condition === "thyroid disorder") {
        return (
          product.ingredients_text?.toLowerCase().trim().includes("soy") ||
          product.ingredients_text?.toLowerCase().trim().includes("broccoli") ||
          product.ingredients_text?.toLowerCase().trim().includes("cabbage") ||
          product.ingredients_text?.toLowerCase().trim().includes("kale")
        );
      }

      if (condition === "food sensitivities (general)") {
        return (
          product.ingredients_text?.toLowerCase().trim().includes("artificial") ||
          product.ingredients_text?.toLowerCase().trim().includes("preservatives") ||
          product.ingredients_text?.toLowerCase().trim().includes("coloring")
        );
      }

      return false;
    });

    return !hasAllergens && !isDietRestricted && !conditionFails;
  });
}

router.post("/", async (req, res) => {
  console.log("Received recommendation request:", req.body);
  try {
    const { userProfile } = req.body;
    if (!userProfile) {
      return res
        .status(400)
        .json({ error: "Missing user profile or product list" });
    }

    const profileHash = hashProfile(userProfile);
    const { data: existing, error } = await supabase
      .from("recommended_products")
      .select("product_ids")
      .eq("profile_hash", profileHash)
      .single();
    if (error) {
      console.error("Error fetching existing recommendations:", error);
    }
    if (existing.product_ids) {
      console.log(
        "✅ Returning cached product IDs from Supabase:",
        existing.product_ids,
      );
      return res.json({ finalProductIds: existing.product_ids });
    }
    const filteredProductList = await handleFilter(products, userProfile);
    console.log(
      `✅ Filtered product list based on user profile: ${filteredProductList.length} products found`,
    );

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    function chunkArray(array, chunk) {
      return Array.from({ length: Math.ceil(array.length / chunk) }, (_, i) =>
        array.slice(i * chunk, i * chunk + chunk),
      );
    }
    const maxProducts = 60;
    const productChunks = chunkArray(
      filteredProductList.slice(0, maxProducts),
      3,
    );
    const allProductIds = new Set(); //Set is a special data structure like an array, but it automatically removes duplicates.
    for (let i = 0; i < productChunks.length; i++) {
      const batch = productChunks[i];
      console.log(`📦 Consulting AI for batch ${i + 1} with ${batch.length}`);
      try {
        const batchIds = await consultAi(userProfile, batch);
        batchIds.forEach((id) => allProductIds.add(id));
      } catch (err) {
        console.error(`❌ Error in batch ${i + 1}:`, err.message);
      }
      await sleep(3000);
    }
    const finalProductIds = Array.from(allProductIds);
    console.log(`✅ AI returned ${finalProductIds.length} unique product IDs`);
    await supabase
      .from("recommended_products")
      .insert([{ profile_hash: profileHash, product_ids: finalProductIds }]);
    res.json({ finalProductIds });
  } catch (error) {
    console.error("Error consulting AI:", error);
    res.status(500).json({ error: "Failed to consult AI" });
  }
});

module.exports = router;
