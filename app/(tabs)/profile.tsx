import { useRouter } from 'expo-router';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Title } from 'react-native-paper';

const Styles = StyleSheet.create({
  container :{
    alignContent : 'flex-start',
    margin : 37,
    width :500,
    height : 200
  }
})

const router = useRouter();
const goToShop = () => {
    router.push('/shop_interface');
  };

const profile = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold">Logged in as</Text>

      <Card style={Styles.container}>

      <Card.Content>
        <Title className="text-center font-bold">Thaariq Hassan R</Title>
        <Title className="text-center font-bold">Shopkeeper</Title>
      </Card.Content>
      <Card.Content>
        <Text className='text-center font-semibold'>thaariq.hassan@gmail.com</Text>
        <Text className='text-center font-semibold'>Shop Name : Lulu Mall</Text>
        <Text className='text-center font-semibold'>Shop Address : Edapally,opposite to MyG</Text>
      </Card.Content>

      <Card.Actions>
         <Button onPress={goToShop}>Select</Button>
      </Card.Actions>

    </Card>
    <Button className='bg-red-700'><Title className='text-white font-bold'>Logout</Title></Button>
    </View>
  );
};

export default profile;
