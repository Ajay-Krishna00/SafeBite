import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import home from "@/assets/icons/home.png";
import profile from "@/assets/icons/person.png";

const TabIcon = ({
  focused,
  title,
  icon,
}: {
  focused: boolean;
  title: string;
  icon: any;
}) => (
  <>
    {focused ? (
      <View className="flex-row items-center justify-center w-full min-w-[120px] min-h-16 mt-5 rounded-full overflow-hidden">
        <Image source={icon} className="size-5" tintColor="#ffffff" />
        <Text className="text-lg text-white ml-2 font-semibold">{title}</Text>
      </View>
    ) : (
      <View className="items-center justify-center w-full min-w-[120px] min-h-16 mt-5 rounded-full overflow-hidden">
        <Image source={icon} className="size-5" tintColor="#ffffff" />
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
            <TabIcon focused={focused} icon={home} title="Home" />
          ),
          headerShown: false,
          animation: "fade",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={profile} title="Profile" />
          ),
          headerShown: false,
          animation: "fade",
        }}
      />
    </Tabs>
  );
};
export default _layout;
