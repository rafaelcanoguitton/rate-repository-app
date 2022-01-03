import React from "react";
import { Image, View, StyleSheet, Linking, Pressable } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { statStack } from "./RepositoryItem";
const styles = StyleSheet.create({
  container: {
    height: '30%',
  },
  statStack: {
    flexDirection: "column",
    alignItems: "center",
  },
  stats: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "space-around",
  },
  statCount: {
    marginHorizontal: 6,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  //this is like a button, wrapping the language text
  language: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#0366d6",
    padding: 5,
    borderRadius: 5,
  },
  upContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  openButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#0366d6",
    padding: 5,
    borderRadius: 5,
  },

});
const Repository = () => {
  console.log("awa");
  const { id } = useParams();
  const { repository } = useRepository({ id: id });
  const openLink = () => {
    Linking.openURL(repository.url);
  };
  if (!repository) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.upContainer}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={{ width: 45, height: 45 }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title} testID="fullName">
            {repository.fullName}{" "}
          </Text>
          <Text style={styles.description} testID="description">
            {repository.description}
          </Text>
          <Text style={styles.language} testID="language">
            {repository.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        {statStack({ stat: repository.stargazersCount, label: "Stars" })}
        {statStack({ stat: repository.forksCount, label: "Forks" })}
        {statStack({ stat: repository.reviewCount, label: "Reviews" })}
        {statStack({ stat: repository.ratingAverage, label: "Rating" })}
      </View>
      <View style={styles.openButton}>
      <Pressable onPress={openLink}>
        <Text style={styles.title}>Open in browser</Text>
      </Pressable>
      </View>
    </View>
  );
};
export default Repository;
