import "./global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: "fade",
            animationDuration: 500,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: "fade",
            animationDuration: 500,
          }}
        />
        <Stack.Screen
          name="scan/index"
          options={{
            headerTitle: "Scanner",
            headerStyle: {
              backgroundColor: "#004d00",
            },
            headerTintColor: "#ffffff",
            animation: "fade",
            animationDuration: 500,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerTitle: "Product Info",
            headerStyle: {
              backgroundColor: "#004d00",
            },
            headerTintColor: "#ffffff",
            animation: "fade",
            animationDuration: 500,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            animation: "fade",
            animationDuration: 500,
          }}
        />
        <Stack.Screen
          name="shop_interface"
          options={{
            headerTitle: "Shop Interface",
            headerStyle: {
              backgroundColor: "#004d00",
            },
            headerTintColor: "#ffffff",
            animation: "fade",
            animationDuration: 500,
          }}
        />
      </Stack>
    </>
  );
}
