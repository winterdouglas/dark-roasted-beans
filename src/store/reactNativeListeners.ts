import { AppState, NativeEventSubscription } from "react-native";
import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";
import { ThunkDispatch } from "@reduxjs/toolkit";

let initialized = false;

export const reactNativeListeners = (
  dispatch: ThunkDispatch<any, any, any>,
  { onFocus, onFocusLost, onOnline, onOffline },
) => {
  let unsubscribeOnChange: NativeEventSubscription | undefined;
  let unsubscribeOnNetworkStatusChange: NetInfoSubscription | undefined;

  if (!initialized) {
    // Handle focus events
    unsubscribeOnChange = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        dispatch(onFocus());
      } else if (state === "background") {
        dispatch(onFocusLost());
      }
    });

    // Handle connection events
    unsubscribeOnNetworkStatusChange = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        dispatch(onOnline());
      } else {
        dispatch(onOffline());
      }
    });
    initialized = true;
  }

  const unsubscribe = () => {
    unsubscribeOnChange?.remove();
    unsubscribeOnNetworkStatusChange?.();
    initialized = false;
  };
  return unsubscribe;
};
