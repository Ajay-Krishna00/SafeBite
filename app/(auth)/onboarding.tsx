import {
  commonAllergies,
  dietaryRestrictions,
  medicalConditions,
  questions,
} from "@/constants/const";
import { setOnboardingDetails } from "@/lib/actions";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SText } from "./login";
import { supabase } from "@/lib/supabase";

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

const QuestionsComp2 = ({
  question,
  value,
  change,
  common,
}: {
  question: { text: string; type: string; relatedTo: string };
  value: string | undefined;
  common: string[];
  change: any;
}) => {
  return (
    <View className="mt-5">
      <SText className="font-semibold text-lg">{question.text}</SText>
      <View className="flex-row gap-2">
        {common.map((c) => singleAnswer(c, value, change))}
      </View>
    </View>
  );
};
const QuestionsComp1 = ({
  question,
  value,
  change,
  common,
}: {
  question: { text: string; type: string; relatedTo: string };
  value: string[];
  common: string[];
  change: any;
}) => {
  return (
    <View className="mt-5">
      <SText className="font-semibold text-lg">{question.text}</SText>
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {lists(common, value, change)}
      </View>
    </View>
  );
};

const onboarding = () => {
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
  const [error, setError] = useState("");
  async function handleSubmit() {
    const { error } = await setOnboardingDetails({
      details: {
        allergies: selectedAllergies,
        medical_conditions: selectedMedicalConditions,
        dietary_restrictions: selectedDietaryRestrictions,
        age_group: selectedAgeGroup,
        allergy_severity: selectedAllergySeverity,
        takes_medicine: selectedYesNo == "Yes",
      },
    });
    if (error) {
      setError("Please try again");
      return;
    }
    router.replace("/home");
  }
  useEffect(() => {
    const fetchData = async () => {
      const { data: user } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("Customerdetails")
        .select()
        .eq("id", user?.user?.id);
      
      if (data?.length !== 0) {
        router.replace("/home");
      }
    };
    fetchData();
  }, []);
  return (
    <View className="flex-1 flex-col bg-gray-200 p-3 pt-5 gap-5">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        scrollEnabled={true}
      >
        <QuestionsComp1
          question={questions[0]}
          value={selectedAllergies}
          common={commonAllergies}
          change={setSelectedAllergies}
        />
        <QuestionsComp1
          question={questions[1]}
          value={selectedMedicalConditions}
          common={medicalConditions}
          change={setSelectedMedicalConditions}
        />
        <QuestionsComp1
          question={questions[2]}
          value={selectedDietaryRestrictions}
          common={dietaryRestrictions}
          change={setSelectedDietaryRestrictions}
        />
        <QuestionsComp2
          question={questions[3]}
          value={selectedYesNo}
          common={["Yes", "No"]}
          change={setSelectedYesNo}
        />
        <QuestionsComp2
          question={questions[4]}
          value={selectedAllergySeverity}
          common={["Mild", "Moderate", "Severe"]}
          change={setSelectedAllergySeverity}
        />
        <QuestionsComp2
          question={questions[5]}
          value={selectedAgeGroup}
          common={["0-12", "13-19", "20-35", "36-50", "51+"]}
          change={setSelectedAgeGroup}
        />
        {error && <Text className="text-red-600">{error}</Text>}
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
