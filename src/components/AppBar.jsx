import React from "react";
import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import { useQuery, useApolloClient } from "@apollo/client";
import { AUTHORIZED_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
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
  const { data } = useQuery(AUTHORIZED_USER);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const SignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
      <Pressable>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        {(!data?.authorizedUser && (
          <>
            <Pressable>
              <Link to="/sign-in">
                <Text style={styles.text}>Sign In</Text>
              </Link>
            </Pressable>
            <Pressable>
              <Link to="/sign-up">
                <Text style={styles.text}>Sign Up</Text>
              </Link>
            </Pressable>
          </>
        )) || (
          <>
            <Pressable onPress={SignOut}>
              <Text style={styles.text}>Sign Out</Text>
            </Pressable>
            <Pressable>
              <Link to="/review">
                <Text style={styles.text}>Review</Text>
              </Link>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
