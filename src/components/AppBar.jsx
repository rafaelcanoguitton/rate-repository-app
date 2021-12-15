import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    flexDirection: "row",
  },
  text: {
    color: "white",
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
      </Pressable>
      <Pressable>
        <Link to="/sign-in">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBar;
