import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const isLoggedIn = true;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoggedIn]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-blue-500">Welcome to{"\n"}</Text>
      <Text
        className="text-blue-500"
        style={{ fontWeight: "bold", fontSize: 44 }}
      >
        SafeBite
      </Text>
    </View>
  );
}
