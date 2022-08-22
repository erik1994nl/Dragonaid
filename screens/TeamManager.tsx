import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, FlatList, StyleSheet, TextInput } from "react-native";

import { Text, View, Button } from "../components/Themed";
import { Peddler, PeddlerClass } from "../types/Types";

export default function TeamManager() {
  getPeddlers();
  return (
    <View style={styles.container}>
      <FlatList data={Peddlers} renderItem={renderPeddlers}></FlatList>
      <View style={styles.addPeddler}>
        <Button
          title="Set"
          width={Dimensions.get("window").width * 0.2}
          onPress={() => {
            console.log("setting peddlers");
            AsyncStorage.setItem("peddlers", JSON.stringify(Peddlers));
          }}
        ></Button>
        <Button
          title="Get"
          width={Dimensions.get("window").width * 0.2}
          onPress={async () => {
            const jsonPeddler = await AsyncStorage.getItem("peddlers");
            console.log("Peddler?", jsonPeddler);
            if (jsonPeddler !== null) {
              const parsedPeddler: Peddler = JSON.parse(jsonPeddler);
              console.log("parsed peddler?", parsedPeddler);
              console.log("name?", parsedPeddler.name);
              console.log("weight?", parsedPeddler.weight);
            }
          }}
        ></Button>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(text) => onChangeWeight(text)}
        >
          33
        </TextInput>
      </View>
    </View>
  );
}

const getPeddlers = () => {
  AsyncStorage.getItem("peddlers").then((peddlerData) => {
    console.log("peddlerData?", peddlerData);
    if (peddlerData !== null) {
      Peddlers = JSON.parse(peddlerData);
    }
  });
};

let Peddlers: Peddler[] = [
  {
    name: "Cees",
    weight: 10,
  },
  {
    name: "Erik",
    weight: 300,
  },
];

const renderPeddlers = ({ item: peddler }: { item: Peddler }) => (
  <View>
    <Text>
      {peddler.name} weegt {peddler.weight}kg
    </Text>
  </View>
);

const onChangeWeight = (w: string) => {
  console.log("w", w);
};

const styles = StyleSheet.create({
  addPeddler: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: Dimensions.get("window").width * 0.4,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 30,
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
