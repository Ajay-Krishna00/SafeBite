import handleRecommendation from "@/app/services/recommendation";
import { param } from "@/backend/routes/summary";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { View, Text, ActivityIndicator, Image } from "react-native";

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState<string[] | null>(null);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecomm = async () => {
      setLoading(true);
      const result = await handleRecommendation();
      setRecommendation(result.finalProductIds || result.productIds || []);
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
      // Boolean is used as a callback function to filter().
      // Falsy values include: null, undefined, false, 0, "" (empty string), and NaN.
      // So this removes anything that's not a valid truthy item.
      setLoading(false);
    };

    fetchDetails();
  }, [recommendation]);

  return (
    <View style={{ padding: 5 }}>
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
          contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
          className=""
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/product/[id]",
                  params: { id: item.id },
                })
              }
            >
              <View style={{ width: 190 }} className="mr-4 flex ">
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 180, height: 220, borderRadius: 8 }}
                    resizeMode="cover"
                    className="bg-gray-300 rounded-lg"
                  />
                )}
                <Text
                  style={{
                    marginTop: 6,
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
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Recommendation;
