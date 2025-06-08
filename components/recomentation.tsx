import handleRecommendation from "@/app/services/recommendation";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecomm = async () => {
      setLoading(true);
      const result = await handleRecommendation();
      setRecommendation(result);
      setLoading(false);
    };
  }, []);
  return (
    <View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={"#004d00"}>Loading...</ActivityIndicator>
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default Recommendation;
