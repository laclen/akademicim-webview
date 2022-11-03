import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, Platform, BackHandler } from "react-native";

export default function App() {
  
  // navigate back function for android
  const webViewRef = React.useRef();
  const onAndroidBackpress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  // WebView does not support swipe back for android 
  // thus we have to handle the goBack function with hardwareBackPress
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
      // handle the goBack function with swipe for android
      onTouchStart={e =>  {
        if(Platform.OS === 'android'){ 
          this.touchX = e.nativeEvent.pageX; 
          this.touchY = e.nativeEvent.pageY 
        } else {
          return null
        }}
      }
      onTouchEnd={e =>  {
        if(Platform.OS === 'android' && this.touchX - e.nativeEvent.pageX < -20){
          if(this.touchY - e.nativeEvent.pageY > -20 && this.touchY - e.nativeEvent.pageY < 20){
            onAndroidBackpress()
          }
        } else {
          return null
        }}
      }
      allowsBackForwardNavigationGestures // only works with iOS
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