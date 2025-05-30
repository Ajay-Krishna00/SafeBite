import { supabase } from "./supabase";

export const setOnboardingDetails = async ({
  details,
}: {
  details?: {
    age: number;
    gender: string;
    allergies: string[];
    conditions: string[];
    diseases: string[];
  };
} = {}) => {
  const session = supabase.auth.getSession();
  console.log(session);
};
