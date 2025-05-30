import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import qr from "@/assets/images/qr.jpg";
import ScanScreen from "../scan";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#004d00", "#00cc00", "#0000"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        height: "50%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        className="w-[280px] h-[230px]"
        onPress={() => router.push("/scan")}
      >
        <Image
          source={qr}
          className="w-[280px] h-[230px]"
          resizeMode="contain"
        />
        <Text className="text-black text-center text-3xl font-semibold mt-4">
          Tap to scan
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default index;
