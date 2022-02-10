import React from "react";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "react-native-elements";

const Place = (props) => {
  const { place, navigation } = props;

  const { _id, images, name, description, address } = place.item;
  const placeImage = images[0];

  const getPlaceDetailHandler = () => {
    navigation.navigate("placeScreen", { id: _id, name });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        getPlaceDetailHandler();
      }}
    >
      <View style={styles.placeView}>
        <View style={styles.placeImageView}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#fff" />}
            source={
              placeImage
                ? { uri: placeImage }
                : require("../../../assets/img/no-image.png")
            }
            style={styles.placeImage}
          />
        </View>
        <View>
          <Text style={styles.placeNameText}>{name.substr(0, 45)}</Text>
          <Text style={styles.placeAddressText}>
            {address.substr(0, 25)}...
          </Text>
          <Text style={styles.placeDescriptionText}>
            {description.substr(0, 20)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FooterList = (props) => {
  const { loading } = props;

  if (loading) {
    return (
      <View style={styles.placeLoader}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundText}>
        <Text>No mas lugares turísticos</Text>
      </View>
    );
  }
};

const PlaceList = (props) => {
  const { places, loadMorePlacesHandler, loading } = props;
  const navigation = useNavigation();

  return (
    <View>
      {size(places) > 0 ? (
        <View>
          <FlatList
            data={places}
            renderItem={(place) => {
              return <Place place={place} navigation={navigation} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            // onEndReachedThreshold={0.5}
            // ListFooterComponent={<FooterList loading={loading} />}
            // onEndReached={loadMorePlacesHandler}
          />
        </View>
      ) : (
        <View style={styles.placeLoader}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  placeLoader: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  placeView: {
    flexDirection: "row",
    margin: 10,
  },
  placeImageView: {
    marginRight: 15,
  },
  placeImage: {
    width: 80,
    height: 80,
  },
  placeNameText: {
    fontWeight: "bold",
  },
  placeAddressText: {
    paddingTop: 2,
    color: "grey",
  },
  placeDescriptionText: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notFoundText: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});

export default PlaceList;
