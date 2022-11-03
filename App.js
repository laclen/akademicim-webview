import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, Platform, BackHandler } from "react-native";

export default function App() {

  // navigate back function for when android hardwareBack pressed
  const webViewRef = React.useRef();
  const onAndroidBackpress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  // there is no swipe back option for android so
  // we handle the goBack function with hardwareBackPress
  React.useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackpress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onAndroidBackpress);
      };
    }
  }, []);

  return (
    <WebView
      allowsBackForwardNavigationGestures
      allowsInlineMediaPlayback
      ref={webViewRef}
      style={styles.container}
      source={{ uri: "https://akademicim.com" }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});