import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

// navigation
const NavigationView = () => {
  <View style={styles.navigationContainer}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonTitle}>Back</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonTitle}>Forward</Text>
    </TouchableOpacity>

  </View>
}

export default function App() {
  return (
    <View style={styles.container}>
      <WebView
      allowNackForwardNavigationGestures={true}
      style={styles.container}
      source={{ uri: 'https://akademicim.com' }}
      />
      <NavigationView/>
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
    alignItems: "center"
  },
  button: {


  },
  buttonTitle:{},
});
