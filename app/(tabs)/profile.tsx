import { View, Text } from "react-native";
import React from "react";

const profile = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl text-green-500 font-bold">Profile</Text>
    </View>
  );
};

export default profile;
