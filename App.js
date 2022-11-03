import * as React from "react";
import { WebView } from "react-native-webview";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
  BackHandler,
} from "react-native";

// navigation
const NavigationView = () => {
  <View style={styles.navigationContainer}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonTitle}>Back</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonTitle}>Forward</Text>
    </TouchableOpacity>
  </View>;
};

export default function App() {
  // navigate back for android
  const webViewRef = React.useRef();
  const onAndroidBackpress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackpress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onAndroidBackpress);
      };
    }
  },[]);

  return (
    <View style={styles.container}>
      <WebView
        allowsBackForwardNavigationGestures
        allowsInlineMediaPlayback
        ignoreSilentHardwareSwitch
        ref={webViewRef}
        style={styles.container}
        source={{ uri: "https://akademicim.com" }}
      />
      <NavigationView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationContainer: {
    height: 60,
    backgroundColor: "#1B1B58",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {},
  buttonTitle: {},
});
