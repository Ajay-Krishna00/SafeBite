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
import Ionicons from "@expo/vector-icons/Ionicons";
import Recommendation from "@/components/recomentation";

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
      withTiming(1.1, { duration: 1000 }), // animate to 1.2 scale
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
          className="w-[270px] h-[280px] rounded-lg flex items-center justify-center"
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
                justifyContent: "center",
                alignItems: "center",
              },
              animatedStyle,
            ]}
            className="bg-yellow-300 rounded-full px-6 py-2 mt-5 flex flex-row"
          >
            <Text
              className="text-gray-900 mr-1"
              style={{ fontSize: 22, fontWeight: "bold" }}
            >
              Tap to scan
            </Text>
            <Ionicons name="scan-circle-outline" size={30} />
          </Animated.View>
        </TouchableOpacity>
      </LinearGradient>
      <View className="flex-1 w-full h-full mb-10 px-5">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Recommended Products for You
        </Text>
        <Recommendation />
      </View>
    </>
  );
};

export default index;
