import { ProductData } from "../product/[id]";
import { supabase } from "@/lib/supabase";

const handleSummary = async (productData: ProductData) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("Customerdetails")
      .select()
      .eq("id", user?.user?.id);
    const allergies = data?.[0].allergies;
    const conditions = data?.[0].medical_conditions;
    const res = await fetch("https://safebite-28tg.onrender.com/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userProfile: {
          allergies: allergies,
          conditions: conditions,
        },
        productData: productData,
      }),
    });
    const result = await res.json();
    console.log("Summary Result:", result);
    return result;
  } catch (error) {
    console.error("Error handling summary:", error);
  }
};
export default handleSummary;
