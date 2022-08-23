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

export class PaddlerClass {
  name: string = "";
  weight: number = 0;

  constructor(paddler: Paddler) {
    this.name = paddler.name;
    this.weight = paddler.weight;
  }

  getKey = () => {
    return `${this.name}${this.weight}`;
  };
}

export const enum SideEnum {
  Left = 0,
  Right = 1,
  Both = 2,
}

export const enum GenderEnum {
  Male = 0,
  Female = 1,
  Other = 2,
}

export type Paddler = {
  name: string;
  weight: number;
  side: SideEnum;
  gender: GenderEnum;
};

export type boatLayout = {
  // Boat layout?!
};
