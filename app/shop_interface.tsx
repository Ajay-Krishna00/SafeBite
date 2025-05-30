import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import itemImage from "./itemImg";

const item = [
  {
    name: "Lays",
    key: "lays",
    price: 20,
    imgsrc: itemImage[0],
    stock_count: 0,
    rating: 4.8,
    expiry: "2025-05-25",
  },
  {
    name: "Pepsi",
    key: "pepsi",
    price: 60,
    imgsrc: itemImage[1],
    stock_count: 20,
    rating: 4.0,
    expiry: "2025-12-27",
  },
  {
    name: "Elite Maida",
    key: "elite_maida",
    price: 100,
    imgsrc: itemImage[2],
    stock_count: 30,
    rating: 4.5,
    expiry: "2025-05-30",
  },
  {
    name: "Boost",
    key: "boost",
    price: 70,
    imgsrc: itemImage[3],
    stock_count: 20,
    rating: 4.8,
    expiry: "2025-07-25",
  },
  {
    name: "Milma curd",
    key: "milma_curd",
    price: 35,
    imgsrc: itemImage[4],
    stock_count: 10,
    rating: 4.8,
    expiry: "2025-06-03",
  },
  {
    name: "Goodday",
    key: "goodday",
    price: 20,
    imgsrc: itemImage[5],
    stock_count: 10,
    rating: 4.8,
    expiry: "2025-11-01",
  },
];

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 37,
    width: 200,
  },
});

const expiryDate = (expiry: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(expiry);
  targetDate.setHours(0, 0, 0, 0);

  if (targetDate < today) {
    return (
      <Card.Content>
        <Text className="text-center text-red-700">
          Expired on {today.toISOString().split("T")[0]}
        </Text>
      </Card.Content>
    );
  } else {
    return (
      <Card.Content>
        <Text className="text-center text-green-700">
          Expires on {today.toISOString().split("T")[0]}
        </Text>
      </Card.Content>
    );
  }
};

const stockCount = (stock_count: number) => {
  if (stock_count == 0)
    return (
      <Card.Content>
        <Text className="text-white text-center bg-red-600 rounded-full mb-2">
          Out of stocks
        </Text>
      </Card.Content>
    );
  else if (stock_count <= 5)
    return (
      <Card.Content>
        <Text className="text-center bg-yellow-600 text-white rounded-full mb-2">
          {stock_count} stocks left
        </Text>
      </Card.Content>
    );
  else
    return (
      <Card.Content>
        <Text className="text-center bg-green-600 text-white rounded-full mb-2">
          {stock_count} stocks left
        </Text>
      </Card.Content>
    );
};
const shop_interface = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      scrollEnabled={true}
    >
      {item.map((item) => {
        return (
          <Card style={Styles.container}>
            {stockCount(item.stock_count)}

            <Card.Cover
              source={{
                uri: item.imgsrc,
              }}
            />
            <Card.Content>
              <Title className="text-center font-bold">{item.name}</Title>
            </Card.Content>
            <Card.Content>
              <Paragraph className="text-center font-semibold">
                Rs {item.price}
              </Paragraph>
            </Card.Content>
            {expiryDate(item.expiry)}
            {/*<Card.Actions>
         <Button></Button>
      </Card.Actions>*/}
          </Card>
        );
      })}
    </ScrollView>
  );
};
export default shop_interface;
