import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { LayoutCreator } from "../components/layoutScripts/LayoutRules";
import { LeftRightWeight } from "../components/layoutScripts/LeftRightWeight";
import { Button, Text, View } from "../components/Themed";
import { Boat, BoatLayout, Paddler, RaceRestrictions } from "../types/Types";

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

  const [topLayout, setTopLayouts] = useState<BoatLayout>({ spots: [] });

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.boat}
        data={topLayout.spots}
        renderItem={renderLayout}
      ></FlatList>
      <Button
        title="Create layouts"
        onPress={() => {
          const layoutCreator = new LayoutCreator(paddlers, raceRestrictions);
          layoutCreator.setLayoutRule(new LeftRightWeight());
          const leftRightLayouts = layoutCreator.createLayouts();

          const boat = new Boat(raceRestrictions);
          boat.setLayout(leftRightLayouts[0]);
          boat.printLayout();
          setTopLayouts(boat.layout);
        }}
      ></Button>
    </View>
  );
}

const paddlersInBoat = 18;
const raceRestrictions: RaceRestrictions = {
  paddlersInBoat: paddlersInBoat,
};

const renderLayout = ({ item: paddler }: { item: Paddler }) => (
  <View style={styles.boatSpot}>
    <Text>{paddler.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  boat: {
    flex: 1,
    flexDirection: "row",
  },
  boatSpot: {
    // backgroundColor: "green",
  },
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
