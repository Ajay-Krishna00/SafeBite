import { ProductData } from "../product/[id]";

const handleSummary = async(productData:ProductData) => {
  try {
    const res = await fetch('https://localhost:3000/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userProfile: {
          allergies: ["dairy", "soy"],
          conditions: ["hypertension", "diabetes"],
        },
        productData: productData,
      }),
    })
    const result = await res.json();
    console.log("Summary Result:", result);
    return result;
  } catch (error) {
    console.error("Error handling summary:", error);
  }
}
export default handleSummary;