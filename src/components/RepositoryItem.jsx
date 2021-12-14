import React from "react";
import { Image, View } from "react-native";
import { StyleSheet } from "react-native";
import Text from "./Text";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent:"flex-start"
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
});
const statStack = ({ stat, label }) => {
  if (stat > 1000) {
    stat = Math.round(stat / 1000) + "k";
  }
  return (
    <View style={styles.statStack}>
      <Text style={styles.statCount}>{stat}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};
const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upContainer}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={{ width: 45  , height: 45 }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        {statStack({ stat: item.stargazersCount, label: "Stars" })}
        {statStack({ stat: item.forksCount, label: "Forks" })}
        {statStack({ stat: item.reviewCount, label: "Reviews" })}
        {statStack({ stat: item.ratingAverage, label: "Rating" })}
      </View>
    </View>
  );
};
export default RepositoryItem;
