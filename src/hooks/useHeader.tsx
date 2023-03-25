import React, { useLayoutEffect, type DependencyList } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Text, TextProps } from "@components/Text";

/**
 * A hook that can be used to set the header of react-navigation screen from within the screen's component.
 */
export function useHeader(headerProps: TextProps, deps: DependencyList = []) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: ({ canGoBack }) =>
        canGoBack ? (
          <Text preset="heading" text="Back" onPress={navigation.goBack} />
        ) : null,
      headerTitle: () => (
        <Text
          style={{ flex: 1, backgroundColor: "red" }}
          preset="heading"
          {...headerProps}
        />
      ),
    } as NativeStackNavigationOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
