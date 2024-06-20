import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export type ScreenOption = NativeStackNavigationOptions | ((props: {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}) => NativeStackNavigationOptions);
