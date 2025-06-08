import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import itemImage from "../components/itemImg";

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
    name: "Good Day",
    key: "goodday",
    price: 20,
    imgsrc: itemImage[5],
    stock_count: 10,
    rating: 4.8,
    expiry: "2025-11-01",
  },
];

const { width } = Dimensions.get("window");

const Styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 15,
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: 150,
    resizeMode: "contain",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const expiryDate = (expiry: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(expiry);
  targetDate.setHours(0, 0, 0, 0);

  const expired = targetDate < today;

  return (
    <View
      style={[
        Styles.badge,
        { backgroundColor: expired ? "#dc2626" : "#16a34a" },
      ]}
    >
      <Text style={Styles.badgeText}>
        {expired ? `Expired on ${expiry}` : `Expires on ${expiry}`}
      </Text>
    </View>
  );
};

const stockCount = (stock_count: number) => {
  let bgColor = "#16a34a"; // green
  let message = `${stock_count} stocks left`;

  if (stock_count === 0) {
    bgColor = "#dc2626"; // red
    message = "Out of stock";
  } else if (stock_count <= 5) {
    bgColor = "#facc15"; // yellow
    message = `${stock_count} stocks left`;
  }

  return (
    <View style={[Styles.badge, { backgroundColor: bgColor }]}>
      <Text style={Styles.badgeText}>{message}</Text>
    </View>
  );
};

const ShopInterface: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
      {item.map((item) => (
        <View style={Styles.card} key={item.key}>
          {stockCount(item.stock_count)}

          <Image source={{ uri: item.imgsrc }} style={Styles.image} />

          <Text style={Styles.title}>{item.name}</Text>
          <Text style={Styles.price}>Rs {item.price}</Text>

          {expiryDate(item.expiry)}
        </View>
      ))}
    </ScrollView>
  );
};

export default ShopInterface;
