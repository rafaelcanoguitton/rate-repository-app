import React, { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import { FlatList, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import RepositoryItem from "./RepositoryItem";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({ item }) => <RepositoryItem item={item} />;
const FilterOption = ({ handleChangeOrderBy, orderBy }) => {
  return (
    <Picker
      selectedValue={orderBy}//bold text
      style={{ height: 50, width: "100%", padding: 10, marginTop: 10, fontWeight: "bold" }}
      onValueChange={(itemValue, itemIndex) => handleChangeOrderBy(itemValue)}
    >
      <Picker.Item label="Latest Repositories" value="CREATED_AT" />
      <Picker.Item label="Highest rated Repositories" value="RATING_AVERAGE" />
      <Picker.Item label="Lowest rated Repositories" value="RATING_AVERAGE2" />
    </Picker>
  );
};
export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [direction,setDirection] = useState("DESC");
  const { repositories } = useRepositories(orderBy,direction);
  const handleChangeOrderBy = (orderBy) => {
    if (orderBy === "RATING_AVERAGE2") {
      setOrderBy("RATING_AVERAGE");
      setDirection("ASC");
    } else {
      setOrderBy(orderBy);
      setDirection("DESC");
    }
  };
  return (
    <View>
      <FilterOption handleChangeOrderBy={handleChangeOrderBy} orderBy={orderBy} />
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};
export default RepositoryList;
