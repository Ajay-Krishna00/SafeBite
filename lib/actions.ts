import { supabase } from "./supabase";

export const setOnboardingDetails = async ({
  details,
}: {
  details: {
    allergies: string[];
    medical_conditions: string[];
    dietary_restrictions: string[];
    age_group: string | undefined;
    allergy_severity: string | undefined;
    takes_medicine: boolean;
  };
}) => {
  const {
    allergies,
    medical_conditions,
    dietary_restrictions,
    age_group,
    allergy_severity,
    takes_medicine,
  } = details ?? {};
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { userError };
  }
  const { data, error } = await supabase.from("Customerdetails").insert({
    id: user.user.id,
    allergies: allergies,
    medical_conditions: medical_conditions,
    dietary_restrictions: dietary_restrictions,
    age_group: age_group,
    allergy_severity: allergy_severity,
    takes_medicine: takes_medicine,
  });
  return {error}
};
