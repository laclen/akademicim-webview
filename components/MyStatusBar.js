import { SafeAreaView, View, StatusBar, StyleSheet, Platform } from "react-native"

const MyStatusBar = () => (
  <View style={styles.statusBar}>
    <SafeAreaView>
      <StatusBar barStyle={"light-content"} translucent={Platform.OS === "android" ? true : false} />
    </SafeAreaView>
  </View>
)

const STATUSBAR_HEIGHT = StatusBar.currentHeight

export default MyStatusBar

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: "black",
  },
})
