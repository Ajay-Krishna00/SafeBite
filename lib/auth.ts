import { supabase } from "./supabase";

export const signUp = async (
  username: string,
  email: string,
  password: string,
  isShopkeeper: boolean,
  businessAddress: string,
  businessName: string,
  businessType: string,
  phone: string,
) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return { error };
  } else {
    const { error } = await supabase
      .from("Users")
      .insert({
        id: data.user?.id,
        username: username,
        email: email,
        isShopkeeper: isShopkeeper,
      });
    if (error) {
      return { error };
    } else {
      if (isShopkeeper) {
        const { error } = await supabase.from("Shopkeepers").insert({
          id: data.user?.id,
          businessName: businessName,
          businessAddress: businessAddress,
          businessType: businessType,
          phone: phone,
        });
        return { error };
      }
    }
    return { error };
  }
};
export const signin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};
