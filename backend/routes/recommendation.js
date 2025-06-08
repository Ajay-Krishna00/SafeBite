const express = require("express");
const { consultAi } = require("../controller/aiController");
const fs = require("fs");
const router = express.Router();
const hashProfile = require("../utils/hashProfile");
const { createClient } = require("@supabase/supabase-js");

const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
const supabase = createClient(
  process.env.EXPO_PUBLIC_PROJECT_URL,
  process.env.EXPO_PUBLIC_PUBLIC_ANON_KEY,
);

function handleFilter(products, userProfile) {
  const { allergies = [], conditions = [], dietary = [] } = userProfile;

  return products.filter((product) => {
    const allergens = product.allergens_tags || [];
    const labels = product.labels_tags || [];

    // ✅ 1. Filter allergens (e.g., en:gluten)
    const hasAllergens = allergies.some((allergy) =>
      allergens.includes(`en:${allergy.toLowerCase()}`),
    );

    // ✅ 2. Filter dietary tags (e.g., en:vegan, en:vegetarian)
    const isDietRestricted = dietary.some(
      (diet) => !labels.includes(`en:${diet.toLowerCase()}`),
    );

    // // ✅ 3. Filter based on medical conditions (this is tricky — basic version)
    // // Example: avoid sugar if diabetic
    // const conditionFails = conditions.some((condition) => {
    //   if (condition.toLowerCase() === "diabetes") {
    //     return product.nutriments?.sugars_100g > 5;
    //   }
    //   if (condition.toLowerCase() === "hypertension") {
    //     return product.nutriments?.salt_100g > 0.3;
    //   }
    //   return false;
    // });

    return !hasAllergens && !isDietRestricted;
  });
}

router.post("/", async (req, res) => {
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
    if (existing && existing.product_ids) {
      console.log("✅ Returning cached product IDs from Supabase.");
      return res.json({ productIds: existing.product_ids });
    }

    const filteredProductList = handleFilter(products, userProfile);
    const productIds = await consultAi(userProfile, filteredProductList);
    await supabase
      .from("recommended_products")
      .insert([{ profile_hash: profileHash, product_ids: productIds }]);
    res.json({ productIds });
  } catch (error) {
    console.error("Error consulting AI:", error);
    res.status(500).json({ error: "Failed to consult AI" });
  }
});

module.exports = router;
