import React from "react";
import { FlatList, Pressable, View, Text, StyleSheet } from "react-native";
import { ReviewItem } from "./Repository";
import { ItemSeparator } from "./RepositoryList";
import useMe from "../hooks/useMe";
import { useHistory } from "react-router-native";
import useDeleteReview from "../hooks/useDelete";
const styles = StyleSheet.create({
  goToRepo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#0366d6",
    padding: 5,
    borderRadius: 5,
    margin: 10,
  },
  deleteRepo: {
    marginTop: 10,
    color: "white",
    backgroundColor: "#d63031",
    padding: 5,
    borderRadius: 5,
    margin: 10,
  },
});
const Actions = ({ item, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();
  const handleDelete = async () => {
    await deleteReview({id: item.id});
    refetch();
  };
  return (
    <>
      <Pressable
        onPress={() =>
          history.push(
            `/repository/${item.id.split(".")[1] + "." + item.id.split(".")[2]}`
          )
        }
        style={styles.goToRepo}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          View Repository
        </Text>
      </Pressable>
      <Pressable
        onPress={handleDelete}
        style={styles.deleteRepo}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          Delete Repository
        </Text>
      </Pressable>
    </>
  );
};
const MyReviews = () => {
  const { loading, data,refetch } = useMe();
  if (loading || !data) return null;
  const reviews = data
    ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          <Actions item={item} refetch={refetch}></Actions>
        </View>
      )}
      ItemSeparatorComponent={() => <ItemSeparator />}
      style={{ padding: 10 }}
    />
  );
};
export default MyReviews;
