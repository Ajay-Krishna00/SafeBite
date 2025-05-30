import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import handleSummary from "../services/summary";

export interface ProductData {
  product_name: string;
  ingredients: string;
  allergens: string;
  additives: string[];
  nutritional_info: {
    sugar: string;
    fat: string;
    salt: string;
    calories: string;
    proteins: string;
  };
  labels: string[];
  nova_score: number;
  nutrition_grade: string;
}

const ProductSummary = () => {
  const { id } = useLocalSearchParams();
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [imgUri, setImgUri] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const [summData, setSummData] = useState<ProductData>();
  const [summaryData, setSummaryData] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState<boolean>(true);

  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${id}.json`,
        );
        const data = await res.json();
        if (data.status === 1) {
          setProductData(data.product);
          setSummData({
            product_name: data.product?.product_name || "Unknown Product",
            ingredients: data.product?.ingredients_text || "Not available",
            allergens: data.product?.allergens || "None listed",
            additives: data.product?.additives_tags || [],
            nutritional_info: {
              sugar: data.product?.nutriments?.sugars_100g || "N/A",
              fat: data.product?.nutriments?.fat_100g || "N/A",
              salt: data.product?.nutriments?.salt_100g || "N/A",
              calories: data.product?.nutriments?.energy_kcal_100g || "N/A",
              proteins: data.product?.nutriments?.proteins_100g || "N/A",
            },
            labels: data.product?.labels_tags || [],
            nova_score: data.product?.nova_group || 0,
            nutrition_grade: data.product?.nutrition_grades || "N/A",
          });
          setImgUri(
            data.product?.selected_images?.front?.display?.fr ??
              data.product?.selected_images?.front?.display?.en ??
              (data.product?.selected_images?.front?.display?.default ||
                data.product?.image_url ||
                "https://placehold.co/360x260?text=No+Image&font=roboto"),
          );
        } else {
          setNotFound(true);
        }
        navigation.setOptions({
          title: data.product?.product_name || "Product Info",
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchSummary = async () => {
      setSummaryLoading(true);
      if (summData) {
        const summary = await handleSummary(summData);
        setSummaryData(summary?.summary || null);
        setSummaryLoading(false);
      }
    };
    fetchSummary();
  }, [summData]);

  return (
    <>
      {loading ? (
        <View className="w-screen h-screen flex items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : notFound ? (
        <View className="w-screen h-screen flex items-center justify-center">
          <Text>Product not found</Text>
        </View>
      ) : (
        <View className="w-screen h-screen p-4 bg-white ">
          <ScrollView
            className="flex-1 text-xl px-1 space-y-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <View
              style={{ width: 360, height: 260 }}
              className="mb-4 relative items-center justify-center"
            >
              {imgLoading && (
                <ActivityIndicator
                  size="small"
                  color="#555"
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    alignSelf: "center",
                    top: "45%",
                  }}
                />
              )}
              <Image
                source={{
                  uri:
                    imgUri ||
                    "https://placehold.co/360x260?text=No+Image&font=roboto",
                }}
                style={{ width: 370, height: 260, backgroundColor: "#f0f0f0" }}
                resizeMode="contain"
                onLoadStart={() => setImgLoading(true)}
                onLoadEnd={() => setImgLoading(false)}
                onError={() => {
                  setImgLoading(false);
                }}
                className="rounded-lg border border-gray-300 shadow-md ml-2"
                alt="Product Image"
              />
            </View>
            <View className="flex flex-row mb-1">
              <Text className="text-2xl font-bold ">
                {productData.product_name || "Unknown Product"}
              </Text>
            </View>
            {/* Nutrition Grade + Nova */}
            <Text className="text-md text-gray-700  mb-2">
              🧪 Nutrition Grade:{" "}
              <Text className="font-semibold uppercase">
                {productData.nutriscore_grade || "N/A"}
              </Text>
            </Text>
            <Text className="text-md text-gray-700 mb-2">
              🔬 Processing:{" "}
              <Text className="font-semibold">
                Nova {productData.nova_group || "N/A"}
              </Text>
            </Text>
            {/* Allergens */}
            <Text className="text-md font-semibold text-red-600 mb-3">
              ⚠️ Allergens:
              <Text className="text-md text-gray-700 ">
                {productData.allergens || "None listed"}
              </Text>
            </Text>
            {/* Additives */}
            <Text className="text-md font-semibold text-yellow-700 mb-3">
              🧬 Additives:
              <Text className="text-md text-gray-700 ">
                {productData.additives_tags?.length
                  ? productData.additives_tags
                      .map((tag: any) => tag.replace("en:", ""))
                      .join(", ")
                  : "None listed"}
              </Text>
            </Text>
            {/* Ingredients */}
            <Text className="text-md font-semibold text-green-700 mb-1">
              🥗 Ingredients:
            </Text>
            <Text className="text-md text-gray-700 mb-3">
              {productData.ingredients_text || "Not available"}
            </Text>
            {/* Nutritional Info */}
            <Text className="text-md font-semibold text-purple-700 mb-1">
              📊 Nutritional Info (per 100g):
            </Text>
            <View className="pl-2">
              <Text className="text-gray-700">
                Calories:{" "}
                {productData.nutriments?.["energy-kcal_100g"] || "N/A"} kcal
              </Text>
              <Text className="text-gray-700">
                Sugar: {productData.nutriments?.["sugars_100g"] || "N/A"} g
              </Text>
              <Text className="text-gray-700">
                Fat: {productData.nutriments?.["fat_100g"] || "N/A"} g
              </Text>
              <Text className="text-gray-700">
                Salt: {productData.nutriments?.["salt_100g"] || "N/A"} g
              </Text>
              <Text className="text-gray-700">
                Protein: {productData.nutriments?.["proteins_100g"] || "N/A"} g
              </Text>
            </View>
            {/* Labels */}
            <Text className="text-md font-semibold text-blue-700 mt-4 mb-1">
              🏷️ Labels:
            </Text>
            <Text className="text-gray-700">
              {productData.labels_tags?.length
                ? productData.labels_tags
                    .map((tag: any) => tag.replace("en:", ""))
                    .join(", ")
                : "None"}
            </Text>
            {/* Expiry Date */}
            <Text className="text-md font-semibold text-orange-600 mt-4 mb-1">
              ⏳ Expiry Date:
            </Text>
            <Text className="text-gray-700">
              {productData.expiration_date || "Not available"}
            </Text>
            :
            <View className="mt-5">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                AI Summary
              </Text>
              <Text className="text-gray-700">
                {summaryLoading ? (
                  <View>
                    <ActivityIndicator size="large" color="black" />
                  </View>
                ) : (
                  summaryData || "No summary available for this product."
                )}
              </Text>
            </View>
            <TouchableOpacity
              className=" bg-green-600 p-3 rounded-lg mb-20 mt-4"
              onPress={() => navigation.goBack()}
            >
              <Text className="text-white text-center text-lg font-semibold ">
                Go Back
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default ProductSummary;
