import handleRecommendation from "@/app/services/recommendation";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { View, Text, ActivityIndicator, Image } from "react-native";

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState<string[] | null>(null);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecomm = async () => {
      setLoading(true);
      const result = await handleRecommendation();
      setRecommendation(result.finalProductIds || []);
      setLoading(false);
    };
    fetchRecomm();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!recommendation || recommendation.length === 0) return;
      setLoading(true);

      const details = await Promise.all(
        recommendation.map(async (id) => {
          try {
            const res = await fetch(
              `https://world.openfoodfacts.org/api/v2/product/${id}`,
            );
            const data = await res.json();
            if (data.status === 1) {
              return {
                id,
                name: data.product.product_name || "No Name",
                image: data.product.image_url || null,
              };
            }
          } catch (err) {
            console.error(`Failed fetching product ${id}`, err);
          }
          return null;
        }),
      );

      setProductDetails(details.filter(Boolean));
      setLoading(false);
    };

    fetchDetails();
  }, [recommendation]);

  return (
    <View style={{ padding: 16 }}>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={"#004d00"} size="large" />
        </View>
      ) : (
        <FlatList
          data={productDetails}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
          renderItem={({ item }) => (
            <View style={{ width: 220, marginRight: 16, alignItems: "center" }}>
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 200, height: 200, borderRadius: 8 }}
                  resizeMode="cover"
                />
              )}
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                numberOfLines={2}
                className="truncate"
              >
                {item.name}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Recommendation;
