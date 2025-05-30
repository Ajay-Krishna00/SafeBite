import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import qr from "@/assets/images/qr.jpg";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const index = () => {
  const router = useRouter();
  const offset = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: offset.value }],
    };
  });
  useEffect(() => {
    offset.value = withRepeat(
      withTiming(1.2, { duration: 1000 }), // scale to 2 over 1s
      -1, // repeat forever
      true, // reverse on every cycle
    );
  }, []);
  return (
    <>
      <LinearGradient
        colors={["#004d00", "#00cc00", "#0000"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          height: "56%",
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
          <Animated.View
            style={[
              {
                // position: 'absolute',
                // top: 0,
                // left: 0,
                // right: 0,
                // bottom: 0,
                justifyContent: "center",
                alignItems: "center",
              },
              animatedStyle,
            ]}
          >
            <View className="bg-yellow-300 rounded-full px-6 py-2">
              <Text
                className="text-gray-600"
                style={{ fontSize: 22, fontWeight: "bold" }}
              >
                Tap to scan
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </LinearGradient>
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to SafeBite
        </Text>
        <Text className="text-lg text-gray-600">
          Scan QR codes to get started!
        </Text>
        <TouchableOpacity
          className="mt-6 px-6 py-3 bg-green-500 rounded-full"
          onPress={() => router.push("/scan")}
        >
          <Text className="text-white text-lg font-semibold">
            Start Scanning
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default index;
