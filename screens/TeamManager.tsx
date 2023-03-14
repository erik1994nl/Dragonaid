import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, TextInput } from "react-native";

import { Text, View, Button } from "../components/Themed";
import { GenderEnum, Paddler as Paddler, SideEnum } from "../types/Types";

export default function TeamManager() {
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

  return (
    <View style={styles.container}>
      <FlatList data={paddlers} renderItem={renderPaddlers}></FlatList>
      <View style={styles.addPaddler}>
        <Button
          title="Set"
          width={Dimensions.get("window").width * 0.2}
          onPress={() => {
            const paddlersToAdd = mockPaddlers;
            setPaddlers(paddlersToAdd);
            AsyncStorage.setItem("paddlers", JSON.stringify(paddlersToAdd));
          }}
        ></Button>
        <Button
          title="X"
          width={Dimensions.get("window").width * 0.2}
          onPress={async () => {
            const emptyPaddlers: Paddler[] = [];
            setPaddlers(emptyPaddlers);
            AsyncStorage.setItem("paddlers", JSON.stringify(emptyPaddlers));
          }}
        ></Button>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(text) => onChangeWeight(text)}
          placeholder="33"
          placeholderTextColor={"grey"}
        />
      </View>
    </View>
  );
}

const mockPaddlers: Paddler[] = [
  {
    name: "Willem",
    weight: 97,
    side: SideEnum.Left,
    gender: GenderEnum.Male,
  },
  {
    name: "Otto",
    weight: 100,
    side: SideEnum.Both,
    gender: GenderEnum.Male,
  },
  {
    name: "Cees",
    weight: 100,
    side: SideEnum.Both,
    gender: GenderEnum.Male,
  },
  {
    name: "Marijke",
    weight: 65,
    side: SideEnum.Left,
    gender: GenderEnum.Female,
  },
  {
    name: "Erik",
    weight: 75,
    side: SideEnum.Both,
    gender: GenderEnum.Male,
  },
  {
    name: "Carin",
    weight: 77,
    side: SideEnum.Left,
    gender: GenderEnum.Female,
  },
  {
    name: "Majid",
    weight: 61,
    side: SideEnum.Both,
    gender: GenderEnum.Male,
  },
  {
    name: "Joop",
    weight: 84,
    side: SideEnum.Both,
    gender: GenderEnum.Male,
  },
  {
    name: "Olga",
    weight: 50,
    side: SideEnum.Right,
    gender: GenderEnum.Female,
  },
  {
    name: "Johan",
    weight: 111,
    side: SideEnum.Left,
    gender: GenderEnum.Male,
  },
  {
    name: "Daniel",
    weight: 80,
    side: SideEnum.Right,
    gender: GenderEnum.Male,
  },
  {
    name: "Erwin",
    weight: 88,
    side: SideEnum.Left,
    gender: GenderEnum.Male,
  },
  {
    name: "Lieke",
    weight: 64,
    side: SideEnum.Left,
    gender: GenderEnum.Female,
  },
  {
    name: "Thyssen",
    weight: 93,
    side: SideEnum.Left,
    gender: GenderEnum.Male,
  },
  {
    name: "Fred",
    weight: 104,
    side: SideEnum.Right,
    gender: GenderEnum.Male,
  },
  {
    name: "Gerda",
    weight: 68,
    side: SideEnum.Left,
    gender: GenderEnum.Female,
  },
  {
    name: "Renie",
    weight: 69,
    side: SideEnum.Left,
    gender: GenderEnum.Male,
  },
  {
    name: "Emma",
    weight: 87,
    side: SideEnum.Right,
    gender: GenderEnum.Female,
  },
  {
    name: "Jorge",
    weight: 70,
    side: SideEnum.Both,
    gender: GenderEnum.Male,
  },
  {
    name: "Frank",
    weight: 82,
    side: SideEnum.Right,
    gender: GenderEnum.Male,
  },
  {
    name: "Edwin",
    weight: 92,
    side: SideEnum.Both,
    gender: GenderEnum.Male,
  },
];

const renderPaddlers = ({ item: paddler }: { item: Paddler }) => (
  <View>
    <Text>
      {paddler.name} weegt {paddler.weight}kg
    </Text>
  </View>
);

const onChangeWeight = (w: string) => {
  // Weight change function
};

const styles = StyleSheet.create({
  addPaddler: {
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
