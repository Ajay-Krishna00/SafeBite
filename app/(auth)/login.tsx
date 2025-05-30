import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const SText = ({ className = "", ...props }) => {
  return <Text className={`text-[#0D0D0D] ${className}`} {...props} />;
};

export const InputWithLabel = ({
  name,
  value,
  change,
}: {
  name: string;
  value: string;
  change: (e: string) => void;
}) => {
  return (
    <View>
      <SText className="text-xl">{name}</SText>
      <TextInput
        placeholder={"Your " + name.toLowerCase()}
        className="bg-gray-100 rounded-sm px-3 h-10"
        value={value}
        onChangeText={(e) => {
          change(e);
        }}
      />
    </View>
  );
};

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  async function handleLogin() {
    
  }
    
  return (
    <View className="flex-1 justify-center items-center bg-gray-200">
      <View className="bg-white p-8 gap-8 w-[80%] rounded-lg shadow-lg">
        <SText className="text-5xl font-semibold m-6 text-center">Login</SText>
        <InputWithLabel name="Email" value={email} change={setEmail} />
        <InputWithLabel name="Password" value={password} change={setPassword} />
        {error && <SText className="text-red-600">{error}</SText>}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-green-700 text-center h-8 justify-center p-1 rounded-md"
          disabled={loading}
        >
          <Text className="text-white text-lg font-bold text-center">
            Log in
          </Text>
        </TouchableOpacity>
        <SText>
          Don't have an account?Create a new one:{" "}
          <Link href={"/signup"} className="text-blue-500">
            Sign Up
          </Link>
        </SText>
      </View>
    </View>
  );
}

export default login;
