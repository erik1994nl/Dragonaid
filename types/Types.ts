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

  static getEmptyPaddler(): Paddler {
    return {
      name: "",
      gender: GenderEnum.Other,
      side: SideEnum.NoSide,
      weight: 0,
    };
  }
}

export const enum SideEnum {
  Left = "left",
  Right = "right",
  Both = "both",

  NoSide = "",
}

export const enum GenderEnum {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Spot = {
  bench: number;
  side: SideEnum;
};

export type Paddler = {
  name: string;
  weight: number;
  side: SideEnum;
  gender: GenderEnum;
};

export type BoatLayout = {
  // Bench counting starts at 1
  spots: Paddler[];
};

export type RaceRestrictions = {
  paddlersInBoat: number;
};
