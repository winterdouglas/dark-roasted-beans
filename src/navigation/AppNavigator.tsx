import { ComponentProps } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { PickerScreen } from "~screens/Picker";
import { OverviewScreen } from "~screens/Overview";
import { ResultScreen } from "~screens/Result";
import { useTheme } from "~hooks/useTheme";

/**
 * This type allows TypeScript to know what routes are defined in the navigator.
 *
 * @see https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 * @see https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Overview: undefined;
  Picker: { selectionType: "types" | "sizes" | "extras" };
  Result: undefined;
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
      initialRouteName="Picker"
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        // This allows navigating back to this screen by type
        getId={({ params }) => params.selectionType}
        name="Picker"
        component={PickerScreen}
        initialParams={{ selectionType: "types" }}
      />
      <Stack.Screen name="Overview" component={OverviewScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

type AppNavigatorProps = Partial<ComponentProps<typeof NavigationContainer>>;

export const AppNavigator = (props: AppNavigatorProps) => {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
