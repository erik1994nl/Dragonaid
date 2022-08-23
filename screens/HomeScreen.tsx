import { FlatList, StyleSheet } from "react-native";

import { Text, View, Button } from "../components/Themed";
import Strings from "../constants/Strings";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { btnGridBtn } from "../types/Types";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.greeting}</Text>
      <FlatList
        data={btnData.map((el) => {
          return { ...el, navigation: navigation };
        })}
        renderItem={renderBtn}
      ></FlatList>
      {/* <Button title="Hello" onPress={() => navigation.navigate('TeamManager')}></Button> */}
    </View>
  );
}
// , navigation: RootTabScreenProps<"HomeScreen">
const btnData: btnGridBtn[] = [
  {
    btn: {
      title: "Manage Team",
      navDestination: "TeamManager",
    },
  },
  {
    btn: {
      title: "Layout creator",
      navDestination: "LayoutCreator",
    },
  },
];

const renderBtn = ({ item }: { item: btnGridBtn }) => (
  <Button
    title={item.btn.title}
    height={item.btn.height}
    width={item.btn.width}
    onPress={() => {
      item.navigation?.navigate(item.btn.navDestination ?? "NotFound");
    }}
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
