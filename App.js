import { useEffect, useRef, useState } from "react"
import { WebView } from "react-native-webview"
import { StyleSheet, Platform, BackHandler, View } from "react-native"
import MyStatusBar from "./components/MyStatusBar"

export default function App() {
  const webViewRef = useRef()

  // navigate back function for android
  const onAndroidBackpress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack()
      return true
    }
    return false
  }

  // WebView does not support swipe back for some android devices
  // thus we have to handle the goBack function with hardwareBackPress
  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackpress)
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onAndroidBackpress)
      }
    }
  }, [])

  // to prevent status bar to be fall under content on new ios devices
  // we render it 100 ms after screen launch
  const [renderStatusBar, setRenderStatusBar] = useState(false)
  setTimeout(() => {
    setRenderStatusBar(true)
  }, 50)
  return (
    <View style={styles.container}>
      {renderStatusBar ? <MyStatusBar /> : null}
      <WebView
        // handle the goBack function with swipe gesture for some android devices
        onTouchStart={(e) => {
          if (Platform.OS === "android") {
            this.touchX = e.nativeEvent.pageX
            this.touchY = e.nativeEvent.pageY
          } else {
            return null
          }
        }}
        onTouchEnd={(e) => {
          if (Platform.OS === "android" && this.touchX - e.nativeEvent.pageX < -20) {
            if (this.touchY - e.nativeEvent.pageY > -20 && this.touchY - e.nativeEvent.pageY < 20) {
              onAndroidBackpress()
            }
          } else {
            return null
          }
        }}
        allowsBackForwardNavigationGestures // only works with iOS
        allowsInlineMediaPlayback
        ref={webViewRef}
        style={styles.container}
        source={{ uri: "https://akademicim.com" }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
})
