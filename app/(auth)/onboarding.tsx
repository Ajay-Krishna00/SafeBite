import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SText } from "./login";
import {
  commonAllergies,
  dietaryRestrictions,
  medicalConditions,
  questions,
} from "@/constants/const";
import { router } from "expo-router";

const QuestionComp = ({
  question,
}: {
  question: { text: string; type: string; relatedTo: string };
}) => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedMedicalConditions, setSelectedMedicalConditions] = useState<
    string[]
  >([]);
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] =
    useState<string[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<
    string | undefined
  >();
  const [selectedAllergySeverity, setSelectedAllergySeverity] = useState<
    string | undefined
  >();
  const [selectedYesNo, setSelectedYesNo] = useState<string | undefined>();
  return (
    <View className="mt-5">
      <SText className="font-semibold text-lg">{question.text}</SText>
      {question.type === "list" && (
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          {question.relatedTo === "allergies" &&
            lists(commonAllergies, selectedAllergies, setSelectedAllergies)}
          {question.relatedTo === "medicalConditions" &&
            lists(
              medicalConditions,
              selectedMedicalConditions,
              setSelectedMedicalConditions,
            )}
          {question.relatedTo === "dietaryRestrictions" &&
            lists(
              dietaryRestrictions,
              selectedDietaryRestrictions,
              setSelectedDietaryRestrictions,
            )}
        </View>
      )}
      {question.type === "yesno" && (
        <View className="flex-row gap-2">
          {singleAnswer("Yes", selectedYesNo, setSelectedYesNo)}
          {singleAnswer("No", selectedYesNo, setSelectedYesNo)}
        </View>
      )}
      {question.type === "select" &&
        (question.relatedTo === "allergySeverity" ? (
          <View className="flex-row gap-2">
            {singleAnswer(
              "Mild",
              selectedAllergySeverity,
              setSelectedAllergySeverity,
            )}
            {singleAnswer(
              "Moderate",
              selectedAllergySeverity,
              setSelectedAllergySeverity,
            )}
            {singleAnswer(
              "Severe",
              selectedAllergySeverity,
              setSelectedAllergySeverity,
            )}
          </View>
        ) : question.relatedTo === "ageGroup" ? (
          <View className="flex-row gap-2 flex-wrap">
            {singleAnswer("0-12", selectedAgeGroup, setSelectedAgeGroup)}
            {singleAnswer("13-19", selectedAgeGroup, setSelectedAgeGroup)}
            {singleAnswer("20-35", selectedAgeGroup, setSelectedAgeGroup)}
            {singleAnswer("36-50", selectedAgeGroup, setSelectedAgeGroup)}
            {singleAnswer("51+", selectedAgeGroup, setSelectedAgeGroup)}
          </View>
        ) : null)}
    </View>
  );
};

const lists = (
  Arr: string[],
  selected: string[],
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  return Arr.map((e) => (
    <TouchableOpacity
      key={e}
      onPress={() => toggleElement(e, selected, setSelected)}
      style={{
        backgroundColor: selected.includes(e) ? "#00C897" : "#E0E0E0",
        borderRadius: 20,
        padding: 10,
        margin: 5,
      }}
    >
      <Text className="text-md">{e}</Text>
    </TouchableOpacity>
  ));
};
const singleAnswer = (
  e: string,
  selected: string | undefined,
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  return (
    <TouchableOpacity
      key={e}
      onPress={() => selectElement(e, selected, setSelected)}
      style={{
        backgroundColor: selected?.includes(e) ? "#00C897" : "#E0E0E0",
        borderRadius: 20,
        padding: 10,
        margin: 5,
      }}
    >
      <Text className="text-md">{e}</Text>
    </TouchableOpacity>
  );
};

const toggleElement = (
  element: string,
  selected: string[],
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  if (selected.includes(element)) {
    setSelected(selected.filter((e) => e !== element));
  } else {
    setSelected([...selected, element]);
  }
};
const selectElement = (
  element: string,
  selected: string | undefined,
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  if (selected === element) {
    setSelected(undefined);
  } else {
    setSelected(element);
  }
};

const onboarding = () => {
  function handleSubmit() {
    router.replace("/home");
  }
  return (
    <View className="flex-1 flex-col bg-gray-200 p-3 pt-5 gap-5">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        scrollEnabled={true}
      >
        {questions.map((question, index) => (
          <QuestionComp key={index} question={question} />
        ))}
        <TouchableOpacity
          className="flex-1 p-2 rounded-md bg-green-700 align-center py-2 h-14 justify-center mt-10"
          onPress={handleSubmit}
        >
          <Text className="text-white text-xl font-bold text-center w-full py-2 z-10">
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default onboarding;
