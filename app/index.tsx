import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import sb from "@/assets/images/sb.png";
import { supabase } from "@/lib/supabase";

export default function Index() {
  const router = useRouter();
  const isLoggedIn = true;
  useEffect(() => {
    const checkUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      const isLoggedIn = false||user;
      const timer = setTimeout(() => {
        if (isLoggedIn) {
          router.replace("/home");
        } else {
          router.replace("/login");
        }
      }, 4000);
      return () => clearTimeout(timer);
    };
    checkUser();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={sb} className="w-[300px] h-[230px]" resizeMode="contain" />
    </View>
  );
}
