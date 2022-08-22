import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, RootTabParamList } from "../types";

export type CustomButton = {
  title: string;
  width?: number | string;
  height?: number | string;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  navDestination?: keyof RootStackParamList;
  onPress?: any;
};
export type btnGridBtn = {
  btn: CustomButton;
  navigation?: CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, "HomeScreen", undefined>,
    NativeStackNavigationProp<RootStackParamList, any, undefined>
  >;
};

export class PeddlerClass {
  name: string = "";
  weight: number = 0;

  constructor(peddler: Peddler) {
    this.name = peddler.name;
    this.weight = peddler.weight;
  }

  getKey = () => {
    return `${this.name}${this.weight}`;
  };
}

export type Peddler = {
  name: string;
  weight: number;
};
