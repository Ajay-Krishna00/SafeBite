import { signUp } from "@/lib/auth";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InputWithLabel, SText } from "./login";

const signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShopkeeper, setIsShopkeeper] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  async function handleSignup() {
    setError("");
    setLoading(true);
    if (
      !username ||
      (isShopkeeper &&
        (!businessAddress || !businessName || !businessType || !phone))
    ) {
      setError("Please fill in all details");
      setLoading(false);
      return;
    }
    const { error } = await signUp(
      username,
      email,
      password,
      isShopkeeper,
      businessAddress,
      businessName,
      businessType,
      phone,
    );
    if (error) {
      setError(error.message);
    } else {
      router.replace("/login");
    }
    setLoading(false);
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-200">
      <View className="bg-white py-6 px-8 justify-evenly gap-2 w-[80%] rounded-lg shadow-lg">
        <SText className="text-5xl font-semibold m-4 text-center">
          Sign Up
        </SText>
        <InputWithLabel name="Username" value={username} change={setUsername} />
        <InputWithLabel name="Email" value={email} change={setEmail} />
        <InputWithLabel name="Password" value={password} change={setPassword} />

        {isShopkeeper && (
          <>
            <InputWithLabel
              name="Business Name"
              value={businessName}
              change={setBusinessName}
            />
            <InputWithLabel
              name="Business Type"
              value={businessType}
              change={setBusinessType}
            />
            <InputWithLabel
              name="Business Address"
              value={businessAddress}
              change={setBusinessAddress}
            />
            <InputWithLabel
              name="Contact Number"
              value={phone}
              change={setPhone}
            />
          </>
        )}
        <View className="flex-row gap-1 justify-start items-center">
          <SText className="max-h-[60%]">Customer</SText>
          <Switch
            value={isShopkeeper}
            onValueChange={() => {
              setIsShopkeeper((prev) => !prev);
            }}
          />
          <SText className="max-h-[60%]">Shopkeeper</SText>
        </View>
        {error && <SText className="text-red-600">{error}</SText>}
        <TouchableOpacity
          onPress={handleSignup}
          className="bg-green-700 text-center h-8 justify-center p-1 rounded-md"
          disabled={loading}
        >
          {!loading && (
            <Text className="text-white text-lg font-bold text-center">
              Sign Up
            </Text>
          )}
          {loading && <ActivityIndicator size={20} color={"white"} />}
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
