import React from "react";
import {
  Image,
  View,
  StyleSheet,
  Linking,
  Pressable,
  FlatList,
} from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { statStack } from "./RepositoryItem";
import { ItemSeparator } from "./RepositoryList";
const styles = StyleSheet.create({
  repoInfo: {
    margin: 10,
  },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    width: "100%",
    borderRadius: 10,
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
    margin: 10,
  },
  ratingCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#0366d6",
    borderWidth: 2,
    //position in the upper left corner

    top: -40,
    left: -5,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  review: {
    fontSize: 12,
    color: "black",
    marginBottom: 5,
  },
});
const RepositoryItem = ({ repository }) => {
  if (!repository) {
    return null;
  }
  const openLink = () => {
    console.log(repository.url);
    Linking.openURL(repository.url);
  };
  return (
    <View style={styles.repoInfo}>
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Open in browser
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const ReviewItem = ({ review }) => {
  //display user, rating, date and comment
  if (!review) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.ratingCircle}>
        <Text>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{review.user.username}</Text>
        <Text style={styles.date}>{review.createdAt}</Text>
        <Text style={styles.review}>{review.text}</Text>
      </View>
    </View>
  );
};
const Repository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({id:id,first:4});
  const onEndReached = () => {
    fetchMore();
  };
  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
      onEndReached={onEndReached}
    />
  );
};
export default Repository;
