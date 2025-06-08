import { supabase } from "@/lib/supabase";

const handleRecommendation = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;
    const { data: custDetails } = await supabase
      .from("Customerdetails")
      .select()
      .eq("id", userId);
    const allergies = custDetails?.[0]?.allergies || [];
    const conditions = custDetails?.[0].medical_conditions;
    const dietary = custDetails?.[0].dietary_restrictions;

    const res = await fetch(
      "https://safebite-28tg.onrender.com/api/recommendation",
      // "http://192.168.162.52:3000/api/recommendation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userProfile: {
            allergies: allergies,
            conditions: conditions,
            dietary: dietary,
          },
        }),
      },
    );
    const result = await res.json();
    console.log("Recommendation Result:", result);
    return result;
  } catch (error) {
    console.error("Error handling recommendation:", error);
  }
};
export default handleRecommendation;
