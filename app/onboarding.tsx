import React from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import { SText } from "./index";
import { setOnboardingDetails } from "@/lib/actions";

const QuestionComp = ({
  question,
}: {
  question: { text: string; type: string };
}) => {
  return (
    <View>
      <SText className="font-semibold text-base">{question.text}</SText>
      <TextInput
        placeholder="Answer"
        className="bg-gray-100 rounded-sm px-3 h-10 w-[85%]"
      />
    </View>
  );
};

const onboarding = () => {
  const questions: { text: string; type: string }[] = [
    { text: "How old are you?", type: "number" },
    { text: "Gender", type: "radio" },
    { text: "Allergies", type: "List" },
    { text: "Disease", type: "List" },
    { text: "Condition", type: "List" },
  ];
  async function handlePress() {
    await setOnboardingDetails()
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-200 p-3 pt-10 gap-4">
      <SText className="text-black text-xl font-bold my-4">
        Please fill your details
      </SText>
      {questions.map((question) => (
        <QuestionComp question={question} />
      ))}
      <TouchableOpacity
        onPress={handlePress}
        className="bg-blue-400 text-center h-8 justify-center"
      >
        Log in
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default onboarding;
