import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import { map } from "lodash";
import axios from "axios";

import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Rating, ListItem, Icon } from "react-native-elements";

import { UserContext } from "../../context/UserContext";

import ImagesCarousel from "../../components/UI/ImagesCarousel";
import Map from "../../components/UI/Map";
import Loader from "../../components/UI/Loader";

import ReviewList from "../../components/Places/ReviewList";

import baseURL from "../../utils/baseUrl";

const screenWidth = Dimensions.get("window").width;

const PlaceTitle = (props) => {
  const { name, description, rating } = props;

  return (
    <View style={styles.placeTitleView}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
      <Rating
        style={styles.rating}
        imageSize={25}
        readonly
        startingValue={parseFloat(rating)}
      />
    </View>
  );
};

const PlaceInfo = (props) => {
  const { location, name, address } = props;

  const infoList = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.placeInfoView}>
      <Text style={styles.placeInfoTitle}>Información del lugar</Text>
      <Map location={location} name={name} height={100} />
      {map(infoList, (item, index) => {
        return (
          <ListItem key={index} containerStyle={styles.listItemContainer}>
            <Icon name={item.iconName} type={item.iconType} color={"#00a680"} />
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem>
        );
      })}
    </View>
  );
};

const PlaceScreen = (props) => {
  const { navigation, route } = props;
  const { id } = route.params;

  const [place, setPlace] = useState(null);
  const [rating, setRating] = useState(0);
  const [login, setLogin] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { user } = useContext(UserContext);

  const toastRef = useRef();

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseURL}/places/${id}`)
        .then((response) => {
          setPlace(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${baseURL}/reviews/rating/${id}`)
        .then((response) => {
          setRating(response.data.avgRating);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [])
  );

  useEffect(() => {
    !user ? setLogin(false) : setLogin(true);
  }, [user]);

  useEffect(() => {
    if (login && place) {
      AsyncStorage.getItem("jwt").then((token) => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .get(`${baseURL}/favorites/me/${place._id}`, config)
          .then((response) => {
            response.data ? setIsFavorite(true) : setIsFavorite(false);
          })
          .catch((error) => console.log(error));
      });
    }
  }, [login, place]);

  const addToFavoritesHandler = () => {
    if (!login) {
      toastRef.current.show("Inicia sesión para añadir a favoritos");
    } else {
      AsyncStorage.getItem("jwt").then((token) => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const payload = {
          place: id,
        };

        axios
          .post(`${baseURL}/favorites`, payload, config)
          .then(() => {
            setIsFavorite(true);
            toastRef.current.show("Lugar añadido a favoritos");
          })
          .catch((error) => {
            console.log(error);
            toastRef.current.show(error.message);
          });
      });
    }
  };

  const deleteFromFavoritesHandler = () => {
    AsyncStorage.getItem("jwt").then((token) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete(`${baseURL}/favorites/${id}`, config)
        .then(() => {
          setIsFavorite(false);
          toastRef.current.show("Lugar removido de favoritos");
        })
        .catch((error) => {
          console.log(error);
          toastRef.current.show(error.message);
        });
    });
  };

  if (!place) return <Loader isVisible={true} text="Cargando..." />;

  return (
    <ScrollView style={styles.bodyView}>
      <View style={styles.favoritesView}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          underlayColor="transparent"
          onPress={
            isFavorite ? deleteFromFavoritesHandler : addToFavoritesHandler
          }
        />
      </View>
      <ImagesCarousel
        imagesArray={place.images}
        height={250}
        width={screenWidth}
      />
      <PlaceTitle
        name={place.name}
        description={place.description}
        rating={rating}
      />
      <PlaceInfo
        location={place.location}
        name={place.name}
        address={place.address}
      />
      <ReviewList
        navigation={navigation}
        placeId={place._id}
        setRating={setRating}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  placeTitleView: {
    padding: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionText: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "relative",
    paddingTop: 20,
    right: 0,
  },
  placeInfoView: {
    margin: 15,
    marginTop: 25,
  },
  placeInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItemContainer: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
  favoritesView: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 5,
  },
});

export default PlaceScreen;
