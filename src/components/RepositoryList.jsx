import React, { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import { FlatList, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import RepositoryItem from "./RepositoryItem";
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce";
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
      onValueChange={(itemValue) => handleChangeOrderBy(itemValue)}
    >
      <Picker.Item label="Latest Repositories" value="CREATED_AT" />
      <Picker.Item label="Highest rated Repositories" value="RATING_AVERAGE" />
      <Picker.Item label="Lowest rated Repositories" value="RATING_AVERAGE2" />
    </Picker>
  );
};
const Keyword = ({ handleChangeKeyword }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={(keyword) => handleChangeKeyword(keyword)}
      
    />
  );
};
export const RepositoryListContainer = ({ repositories, onEndReach}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};
const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [direction,setDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [value] = useDebounce(searchKeyword, 500);
  const { repositories, fetchMore } = useRepositories(orderBy,direction,value,8,);
  const handleChangeOrderBy = (orderBy) => {
    if (orderBy === "RATING_AVERAGE2") {
      setOrderBy("RATING_AVERAGE");
      setDirection("ASC");
    } else {
      setOrderBy(orderBy);
      setDirection("DESC");
    }
  };
  const handleChangeKeyword = (keyword) => {
    setSearchKeyword(keyword);
  };
  const onEndReach = () => {
    fetchMore();
  };
  return (
    <View>
      <Keyword handleChangeKeyword={handleChangeKeyword} />
      <FilterOption handleChangeOrderBy={handleChangeOrderBy} orderBy={orderBy} />
      <RepositoryListContainer repositories={repositories} onEndReach={onEndReach}/>
    </View>
  );
};
export default RepositoryList;
