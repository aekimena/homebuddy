import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalContext } from "@gorhom/bottom-sheet/lib/typescript/contexts";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Provider } from "react-redux";
import store from "./src/store/configureStore";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSansBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
    OpenSansLight: require("./src/assets/fonts/OpenSans-Light.ttf"),
    OpenSansMedium: require("./src/assets/fonts/OpenSans-Medium.ttf"),
    OpenSansSemiBold: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null; // or a splash/loading component
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <NavigationContainer onReady={() => SplashScreen.hide()}>
              <RootNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
