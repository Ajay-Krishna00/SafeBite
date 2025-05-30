import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Login",
          headerStyle: {
            backgroundColor: "#004d00",
          },
          headerBackVisible: false,
          headerTintColor: "#ffffff",
          animation: "fade",
          animationDuration: 500,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Sign Up",
          headerStyle: {
            backgroundColor: "#004d00",
          },
          headerBackVisible: false,
          headerTintColor: "#ffffff",
          animation: "fade",
          animationDuration: 500,
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerTitle: "Tell Us About Yourself",
          headerStyle: {
            backgroundColor: "#004d00",
          },
          headerBackVisible: false,
          headerTintColor: "#ffffff",
          animation: "fade",
          animationDuration: 500,
        }}
      />
    </Stack>
  );
}
