import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, Platform, BackHandler } from "react-native";

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
        BackHandler.removeEventListener(
          "hardwareBackPress",
          onAndroidBackpress
        );
      };
    }
  }, []);

  return (
    <WebView
      allowsBackForwardNavigationGestures
      allowsInlineMediaPlayback
      ignoreSilentHardwareSwitch
      ref={webViewRef}
      style={styles.container}
      source={{ uri: "https://akademicim.com" }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
