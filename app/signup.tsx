import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { InputWithLabel, SText } from "./index";
import { signUp } from "@/lib/auth";

const signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await signUp(username, email, password);
    if (error) {
      setError(error.message);
    } else {
      router.replace("/");
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-200">
      <View className="bg-white p-8 gap-8 w-[80%]">
        <SText className="text-5xl font-semibold m-6 text-center">
          Sign Up
        </SText>
        <InputWithLabel name="Username" value={username} change={setUsername} />
        <InputWithLabel name="Email" value={email} change={setEmail} />
        <InputWithLabel name="Password" value={password} change={setPassword} />
        {error && <SText className="text-red-600">{error}</SText>}
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-blue-400 text-center h-8 justify-center"
        >
          Sign up
        </TouchableOpacity>
        <SText>
          Already have an account?
          <Link href={"/"} className="text-blue-500">
            Log in
          </Link>
        </SText>
      </View>
    </View>
  );
};

export default signup;
