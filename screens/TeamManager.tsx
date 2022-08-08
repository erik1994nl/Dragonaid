import { Dimensions, FlatList, StyleSheet, TextInput } from "react-native";

import { Text, View, Button } from "../components/Themed";
import { Peddler } from "../types/Types";

export default function TeamManager() {
  return (
    <View style={styles.container}>
      <FlatList data={Peddlers} renderItem={renderPeddlers}></FlatList>
      <View style={styles.addPeddler}>
        <Button
          title="hoi"
          width={Dimensions.get("window").width * 0.4}
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

const Peddlers: Peddler[] = [
  {
    name: "Cees",
    weight: 10,
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
