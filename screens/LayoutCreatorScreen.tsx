import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, View } from "../components/Themed";
import { boatLayout, Paddler } from "../types/Types";

export default function LayoutCreatorScreen() {
  // Get Paddlers from storage
  const [paddlers, setPaddlers] = useState<Paddler[]>([]);
  useEffect(() => {
    AsyncStorage.getItem("paddlers").then((paddlerData) => {
      if (paddlerData !== null) {
        setPaddlers(JSON.parse(paddlerData));
      } else {
        setPaddlers([]);
      }
    });
  }, []);

  const [topLayouts, setTopLayouts] = useState<boatLayout[]>([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HI!</Text>
      <Button
        title="Create layouts"
        onPress={() => {
          console.log("Generate layouts with: ", paddlers);
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
