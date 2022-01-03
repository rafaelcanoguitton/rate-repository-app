import React from "react";
import { StyleSheet, View } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import RepositoryItem from "./RepositoryItem";
import Repository from "./Repository";
import SignIn from "./SignIn";
import { Route, Switch, Redirect } from "react-router-native";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/repository/:id">
          <Repository />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
