import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { InputWithLabel, SText } from "./login";

const signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  async function handleSignup() {}

  return (
    <View className="flex-1 justify-center items-center bg-gray-200">
      <View className="bg-white p-8 gap-8 w-[80%] rounded-lg shadow-lg">
        <SText className="text-5xl font-semibold m-6 text-center">
          Sign Up
        </SText>
        <InputWithLabel name="Username" value={username} change={setUsername} />
        <InputWithLabel name="Email" value={email} change={setPassword} />
        <InputWithLabel name="Password" value={password} change={setPassword} />
        {error && <SText className="text-red-600">{error}</SText>}
        <TouchableOpacity
          onPress={() => router.push("/onboarding")}
          className="bg-green-700 text-center h-8 justify-center p-1 rounded-md"
        >
          <Text className="text-white text-lg font-bold text-center">
            Sign Up
          </Text>
        </TouchableOpacity>
        <SText>
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-500">
            Log in
          </Link>
        </SText>
      </View>
    </View>
  );
};

export default signup;
