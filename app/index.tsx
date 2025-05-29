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

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     router.push("/onboarding");
  //   }, 10);
  // }, []);

  return (
    <View className="flex-1 justify-center items-center bg-gray-200">
      <View className="bg-white p-8 gap-8 w-[80%]">
        <SText className="text-5xl font-semibold m-6 text-center">Login</SText>
        <InputWithLabel name="Email" value={email} change={setEmail} />
        <InputWithLabel name="Password" value={password} change={setPassword} />
        <TouchableOpacity
          onPress={() => {}}
          className="bg-blue-400 text-center h-8 justify-center"
        >
          Log in
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
