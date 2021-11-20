import React, { useState, useEffect } from "react";
import axios from "axios";

import { View, FlatList, Image, StyleSheet } from "react-native";
import { SearchBar, ListItem, Avatar } from "react-native-elements";

import baseURL from "../../utils/baseUrl";

const NotFoundPlaces = () => {
  return (
    <View>
      <Image
        source={require("../../../assets/img/no-result-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const Place = (props) => {
  const { place, navigation } = props;
  const { _id, name, images } = place.item;

  return (
    <ListItem>
      <ListItem.Content>
        <Avatar
          source={
            images[0]
              ? { uri: images[0] }
              : require("../../../assets/img/no-image.png")
          }
        />
        <ListItem.Title style={{ paddingLeft: 5 }}>{name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron
        onPress={() => {
          navigation.navigate("placeScreen", { id: _id });
        }}
      />
    </ListItem>
  );
};

const SearchScreen = (props) => {
  const { navigation } = props;
  const [search, setSearch] = useState();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (search) {
      axios
        .get(`${baseURL}/places?keyword=${search}`)
        .then((response) => {
          setPlaces(response.data.places);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Search"
        containerStyle={styles.searchBar}
        value={search}
        onChangeText={(e) => {
          setSearch(e);
        }}
      />
      {places.length === 0 ? (
        <NotFoundPlaces />
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(place) => {
            return <Place place={place} navigation={navigation} />;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
});

export default SearchScreen;
