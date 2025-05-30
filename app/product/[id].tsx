import { View, Text, ActivityIndicator, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

const ProductSummary = () => {
  const { id } = useLocalSearchParams();
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [imgUri, setImgUri] = useState<string | null>(null);

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
            className="flex-1 text-xl px-1 space-y-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <Image
              source={{
                uri:
                  imgUri ||
                  "https://placehold.co/360x260?text=No+Image&font=roboto",
              }}
              className="mb-4"
              alt="Product Image"
              key={imgUri}
              style={{ width: 360, height: 260 }}
              resizeMode="contain"
            />
            <Text className="text-2xl mb-1">
              Name: {productData.product_name}
            </Text>
            <Text className="text-lg mb-1">Brand: {productData.brands}</Text>
            <Text className="text-lg mb-1">
              Ingredients: {productData.ingredients_text}
            </Text>
            <Text className="text-lg mb-1">
              Allergens:{" "}
              {productData.allergens_tags?.join(", ") || "None listed"}
            </Text>
            <Text className="text-lg mb-1">
              Additives:{" "}
              {productData.additives_tags?.join(", ") || "None listed"}
            </Text>
            <Text className="text-lg mb-1">
              Nutrition Grade: {productData.nutrition_grades}
            </Text>
            <Text className="text-lg mb-1">
              Eco Score: {productData.ecoscore_grade}
            </Text>
            <Text className="text-lg mb-1">
              Vegetarian:{" "}
              {productData.ingredients_analysis_tags?.includes("en:vegetarian")
                ? "Yes"
                : "No"}
            </Text>
            <Text className="text-lg mb-1">
              Vegan:{" "}
              {productData.ingredients_analysis_tags?.includes("en:vegan")
                ? "Yes"
                : "No"}
            </Text>
            <Text className="text-lg mb-1">
              Quantity: {productData.quantity}
            </Text>
            <Text className="text-lg mb-1">
              Serving Size: {productData.serving_size}
            </Text>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default ProductSummary;
