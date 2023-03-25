import React, { ComponentProps } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { HomeScreen } from "screens/Home";
import { OverviewScreen } from "screens/Overview";

/**
 * This type allows TypeScript to know what routes are defined in the navigator.
 *
 * @see https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 * @see https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Home: undefined;
  Overview: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

/**
 * @see https://reactnavigation.org/docs/stack-navigator
 */
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        headerShadowVisible: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Overview" component={OverviewScreen} />
    </Stack.Navigator>
  );
};

type NavigationProps = Partial<ComponentProps<typeof NavigationContainer>>;

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
