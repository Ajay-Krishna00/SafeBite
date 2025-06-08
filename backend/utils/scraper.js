const fs = require("fs");

const BASE_URL = "https://world.openfoodfacts.org/cgi/search.pl";
const PAGE_SIZE = 100;
const TOTAL_PRODUCTS = 5000;
const OUTPUT_FILE = "products.json";

async function fetchProducts(page) {
  const params = await new URLSearchParams({
    action: "process",
    page_size: PAGE_SIZE,
    page: page,
    json: true,
    lc: "en",
  });
  const url = `${BASE_URL}?${params.toString()}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.products || [];
}
(async function generateProduct() {
  //() means this is an IIFE (Immediately Invoked Function Expression)
  let allProducts = [];
  let page = 1;
  console.log(`🚀 Starting fetch to get ${TOTAL_PRODUCTS} English products...`);
  while (allProducts.length < TOTAL_PRODUCTS) {
    console.log(`📦 Fetching page ${page}`);
    const products = await fetchProducts(page);
    if (products.length === 0) {
      console.log(`No more products found on page ${page}. Stopping...`);
      break;
    }
    for (const product of products) {
      const hasText =
        product.product_name &&
        product.product_name.length > 1 &&
        product.ingredients_text &&
        product.ingredients_text.length > 1 &&
        product.allergens_tags &&
        product.allergens_tags.length > 0;

      if (!hasText) {
        continue;
      }
      allProducts.push({
        id: product.code || "",
        product_name: product.product_name || "",
        ingredients_text: product.ingredients_text || "",
        allergens_tags: product.allergens_tags || [],
        labels_tags: product.labels_tags || [],
        nutriments: product.nutriments || {},
        nutriscore_grade: product.nutriscore_grade || "",
        categories_tags: product.categories_tags || [],
      });
    }
    page++;
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allProducts, null, 2));
  console.log(
    `✅ Done. ${allProducts.length} English products saved to '${OUTPUT_FILE}'.`,
  );
})();
