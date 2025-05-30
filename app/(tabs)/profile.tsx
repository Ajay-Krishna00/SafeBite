import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Card, Title } from 'react-native-paper';

const Styles = StyleSheet.create({
  container :{
    alignContent : 'flex-start',
    margin : 37,
    width :350,
    height : 200
  }
})

const router = useRouter();
const goToShop = () => {
    router.push('/shop_interface');
  };

const profile = () => {
  const [user, setUser] = React.useState<any>(null);
  const [shop, setShop] = React.useState<any>(null);
  const [cust, setCust] = React.useState<any>(null);
  const [users, setUsers] = React.useState<any>(null);
  useEffect(() => {
    const fetchD=async () => {
      const { data: user } = await supabase.auth.getUser();
      const { data: shop } = await supabase.from('Shopkeepers').select('*').eq('id', user?.user?.id).single();
      const { data: cust } = await supabase.from('Customerdetails').select('*').eq('id', user?.user?.id).single();
      const { data: users } = await supabase.from('Users').select('*').eq('id', user?.user?.id).single();
    setUser(user);
      setShop(shop);
      setCust(cust);
      setUsers(users);
    }
    fetchD()
  })
  
  const isShopkeeper = users?.isShopkeeper;
  const allergies = cust?.allergies;
  const conditions = cust?.medical_conditions;
  const diet = cust?.dietary_restrictions;
  const takesMedication = cust?.takes_medicine;
  const list = (str:string[]) =>( 
    str.map((e:any) => (
        <TouchableOpacity
          key={e}
          style={{
            backgroundColor: "#00C897" ,
            borderRadius: 20,
            padding: 10,
            margin: 5,
          }}
        >
          <Text className="text-md">{e}</Text>
        </TouchableOpacity>
      )))
  
  return (
    <View
      style={{
        flex: 1,
        alignItems:"flex-start"
      }}
      className='px-10 py-5 bg-white gap-3' 
    >

      <Title className="text-center font-bold mt-10">{users?.username}</Title>

      <Text className="text-center font-bold">{user?.user?.email}</Text>
      <Text className="text-center font-bold">Allergies</Text>
      <View className='flex-row flex-wrap justify-center'>
        {allergies ? list(allergies) : <Text className='text-red-500'>No Allergies</Text>}
      </View>
      <Text className="text-center font-bold">Medical Conditions</Text>
      <View className='flex-row flex-wrap justify-center'>
        {conditions ? list(conditions) : <Text className='text-red-500'>No Medical Conditions</Text>}
      </View>
      <Text className="text-center font-bold">Dietary Restrictions</Text>
      <View className='flex-row flex-wrap justify-center'>
        {diet ? list(diet) : <Text className='text-red-500'>No Dietary Restrictions</Text>}
      </View>
      <Text className="text-center font-bold">Takes Medication</Text>
      <View className='flex-row flex-wrap justify-center'>
        {takesMedication ? list(takesMedication) : <Text className='text-red-500'>No Medication</Text>}
      </View>

      {isShopkeeper&&<><View
      style={{
        flex: 1,
        alignItems:"flex-start"
      }}
        className='px-10 py-5 bg-white gap-3'
      >
        <Title className="text-center font-bold">Shop Details</Title>
        <Text className="text-center font-bold">Shop Name: {shop?.businessName}</Text>
        <Text className="text-center font-bold">Shop Address: {shop?.businessAddress}</Text>
        <Text className="text-center font-bold">Shop Contact: {shop?.businessType}</Text>
        <Button mode="contained" onPress={goToShop} className='bg-green-500 rounded-lg'>
          Go to Shop
        </Button>
        
      </View></>}
      <TouchableOpacity className='bg-red-500 rounded-lg' onPress={async () => { await supabase.auth.signOut() }}>
        <Text className='text-white font-bold text-xl px-5 py-2'>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
