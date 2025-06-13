import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabIcon = ({
  focused,
  title,
  icon,
}: {
  focused: boolean;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}) => (
  <>
    {focused ? (
      <View className="flex-row items-center justify-center w-full min-w-[120px] min-h-16 mt-5 rounded-full overflow-hidden">
        <Ionicons
          name={
            focused
              ? icon
              : (`${icon}-outline` as keyof typeof Ionicons.glyphMap)
          }
          size={21}
          color={"#fde047"}
        />
        <Text className="text-lg text-[#fdeb84] ml-2 font-semibold">
          {title}
        </Text>
      </View>
    ) : (
      <View className="items-center justify-center w-full min-w-[120px] min-h-16 mt-5 rounded-full overflow-hidden">
        <Ionicons
          name={
            focused
              ? icon
              : (`${icon}-outline` as keyof typeof Ionicons.glyphMap)
          }
          size={20}
          color={"#ffffff"}
        />
      </View>
    )}
  </>
);
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#004d00",
          borderRadius: 50,
          position: "absolute",
          height: 54,
          marginHorizontal: 16,
          marginBottom: 40,
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={"home"} title="Home" />
          ),
          headerShown: false,
          animation: "fade",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={"person"} title="Profile" />
          ),
          headerTitle: "Profile",
          headerStyle: {
            backgroundColor: "#004d00",
          },
          headerTintColor: "#ffffff",
          animation: "fade",
        }}
      />
    </Tabs>
  );
};
export default _layout;
