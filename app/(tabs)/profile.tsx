import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Styles = StyleSheet.create({
  container: {
    alignContent: "flex-start",
    margin: 37,
    width: 350,
    height: 200,
  },
});

const router = useRouter();
const goToShop = () => {
  router.push("/shop_interface");
};

const profile = () => {
  const [user, setUser] = React.useState<any>(null);
  const [shop, setShop] = React.useState<any>(null);
  const [cust, setCust] = React.useState<any>(null);
  const [users, setUsers] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    const fetchD = async () => {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();
      const { data: shop } = await supabase
        .from("Shopkeepers")
        .select("*")
        .eq("id", user?.user?.id)
        .single();
      const { data: cust } = await supabase
        .from("Customerdetails")
        .select("*")
        .eq("id", user?.user?.id)
        .single();
      const { data: users } = await supabase
        .from("Users")
        .select("*")
        .eq("id", user?.user?.id)
        .single();
      setUser(user);
      setShop(shop);
      setCust(cust);
      setUsers(users);
      setLoading(false);
    };
    fetchD();
  }, []);

  const isShopkeeper = users?.isShopkeeper;
  const allergies = cust?.allergies;
  const conditions = cust?.medical_conditions;
  const diet = cust?.dietary_restrictions;
  const takesMedication = cust?.takes_medicine;
  const list = (str: string[]) =>
    str.map((e: any) => (
      <TouchableOpacity
        key={e}
        style={{
          backgroundColor: "#00C897",
          borderRadius: 20,
          padding: 10,
          margin: 5,
        }}
      >
        <Text className="text-md">{e}</Text>
      </TouchableOpacity>
    ));

  return (
    <>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#15803d" />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
          }}
          className="px-5 py-5 bg-white gap-3"
        >
          <View className="flex flex-row items-center gap-1 justify-center mt-2">
            <Ionicons
              name={"person-circle-outline"}
              size={22}
              color={"#007b00"}
            />
            <Text className="text-center font-bold text-xl ">
              {users?.username}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-1 justify-center">
            <Ionicons name={"mail-outline"} size={22} color={"#007b00"} />
            <Text className="text-center font-bold">{user?.user?.email}</Text>
          </View>

          <Text className="text-center font-bold underline">Allergies</Text>
          <View className="flex-row flex-wrap justify-center">
            {allergies ? (
              list(allergies)
            ) : (
              <Text className="text-red-500">No Allergies</Text>
            )}
          </View>
          <Text className="text-center font-bold underline">
            Medical Conditions
          </Text>
          <View className="flex-row flex-wrap justify-center">
            {conditions ? (
              list(conditions)
            ) : (
              <Text className="text-red-500">No Medical Conditions</Text>
            )}
          </View>
          <Text className="text-center font-bold underline">
            Dietary Restrictions
          </Text>
          <View className="flex-row flex-wrap justify-center">
            {diet ? (
              list(diet)
            ) : (
              <Text className="text-red-500">No Dietary Restrictions</Text>
            )}
          </View>
          <Text className="text-center font-bold underline">
            Takes Medication
          </Text>
          <View className="flex-row flex-wrap justify-center">
            {takesMedication ? (
              <Text className="text-red-500">Yes</Text>
            ) : (
              <Text className="text-red-500">No Medication</Text>
            )}
          </View>

          {isShopkeeper && (
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
              }}
              className="gap-3 "
            >
              <Text className="text-center font-bold text-3xl underline">
                Shop Details
              </Text>
              <Text className="text-center font-bold">
                Shop Name:{"  "}
                <Text className="text-center font-bold text-lg">
                  {shop?.businessName}
                </Text>
              </Text>
              <Text className="text-center font-bold">
                Shop Address:{"  "}
                <Text className="text-center font-bold text-lg">
                  {shop?.businessAddress}
                </Text>
              </Text>
              <Text className="text-center font-bold">
                Shop Type:{"  "}
                <Text className="text-center font-bold text-lg">
                  {shop?.businessType}
                </Text>
              </Text>
              <TouchableOpacity
                onPress={goToShop}
                className="bg-yellow-300 rounded-lg"
              >
                <Text className="text-gray-600 font-bold text-xl px-5 py-2">
                  Go to Shop Interface
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-500 rounded-lg ml-1 mt-5"
                onPress={async () => {
                  await supabase.auth.signOut();

                  router.push("/login");
                }}
              >
                <Text className="text-white font-bold text-xl px-5 py-2">
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {!isShopkeeper && (
            <TouchableOpacity
              className="bg-red-500 rounded-lg mt-5"
              onPress={async () => {
                await supabase.auth.signOut();
                router.push("/login");
              }}
            >
              <Text className="text-white font-bold text-xl px-5 py-2">
                Logout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

export default profile;
