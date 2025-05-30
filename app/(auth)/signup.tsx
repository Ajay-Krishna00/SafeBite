import { signUp } from "@/lib/auth";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
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
    }
    const { error } = await signUp(
      username,
      email,
      password,
      isShopkeeper,
      businessAddress,
      businessName,
      businessType,
      phone
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
        <View className="flex-row gap-2 justify-center">
          <SText>Customer</SText>
          <Switch
            value={isShopkeeper}
            onValueChange={() => {
              setIsShopkeeper((prev) => !prev);
            }}
          />
          <SText>Shopkeeper</SText>
        </View>
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
        {error && <SText className="text-red-600">{error}</SText>}
        <TouchableOpacity
          onPress={handleSignup}
          className="bg-green-700 text-center h-8 justify-center p-1 rounded-md"
          disabled={loading}
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
