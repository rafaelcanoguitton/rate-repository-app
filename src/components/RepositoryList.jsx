import React from "react";
import useRepositories from "../hooks/useRepositories";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  console.log(repositoryNodes);
  const renderItem = ({ item }) => <RepositoryItem item={item} />;
  return (
    <FlatList
      data={repositoryNodes} // <- Here's what I need to change
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
