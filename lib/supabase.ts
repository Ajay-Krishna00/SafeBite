import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_PROJECT_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_PUBLIC_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
