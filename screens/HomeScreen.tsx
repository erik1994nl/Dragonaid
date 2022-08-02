import { Dimensions, FlatList, StyleSheet } from "react-native";

import { Text, View, Button } from "../components/Themed";
import Strings from "../constants/Strings";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.greeting}</Text>
      <FlatList
        data={btnData.map((el) => Object.assign({}, el, navigation))}
        renderItem={renderBtn}
      ></FlatList>
    </View>
  );
}

const btnData: btnGridBtn[] = [
  {
    btn: {
      title: "Manage Team",
    },
  },
  {
    btn: {
      title: "Second button",
    },
  },
];

const renderBtn = ({ item }: { item: btnGridBtn }) => (
  <Button
    title={item.btn.title}
    height={item.btn.height}
    width={item.btn.width}
  ></Button>
);

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
