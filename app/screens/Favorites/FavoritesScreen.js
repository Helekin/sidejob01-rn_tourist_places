import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import axios from "axios";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Image, Icon, Button } from "react-native-elements";

import { UserContext } from "../../context/UserContext";

import Loader from "../../components/UI/Loader";

import baseURL from "../../utils/baseUrl";

const NotFoundPlaces = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Todavía no tienes lugares favoritos
      </Text>
    </View>
  );
};

const UserNotLogged = (props) => {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Necesitas iniciar sesión para ver esta sección
      </Text>
      <Button
        title="Ir a inicio de sesión"
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#00a680" }}
        onPress={() => navigation.navigate("login")}
      />
    </View>
  );
};

const Place = (props) => {
  const { place, setLoading, toastRef, setReload, navigation } = props;
  const { _id, name, images } = place.item.place;

  const confirmDeleteFromFavoriteHandler = () => {
    Alert.alert("Eliminar de favoritos", "¿Está seguro?", [
      {
        text: "cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: deleteFromFavoriteHandler,
      },
      { cancelable: false },
    ]);
  };

  const deleteFromFavoriteHandler = () => {
    setLoading(true);
    AsyncStorage.getItem("jwt").then((token) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete(`${baseURL}/favorites/${_id}`, config)
        .then(() => {
          setLoading(false);
          setReload(true);
          toastRef.current.show("Lugar removido de favoritos");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          toastRef.current.show(error.message);
        });
    });
  };

  return (
    <View style={styles.favorite}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("placeScreen", { id: _id });
        }}
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          source={
            images[0]
              ? { uri: images[0] }
              : require("../../../assets/img/no-image.png")
          }
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            containerStyle={styles.favorite}
            underlayColor="transparent"
            onPress={() => {
              confirmDeleteFromFavoriteHandler();
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const FavoritesScreen = () => {
  const navigation = useNavigation();

  const [places, setPlaces] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const { user } = useContext(UserContext);

  const toastRef = useRef();

  useEffect(() => {
    !user ? setLogin(false) : setLogin(true);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (login) {
        AsyncStorage.getItem("jwt").then((token) => {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          axios
            .get(`${baseURL}/favorites/me`, config)
            .then((response) => {
              setPlaces(response.data);
            })
            .catch((error) => {
              console.log(error.message);
              toastRef.current.show(error.message);
            });
        });
      }
      setReload(false);
    }, [login, reload])
  );

  if (!login) {
    return <UserNotLogged navigation={navigation} />;
  }

  if (places?.length === 0) {
    return <NotFoundPlaces />;
  }

  return (
    <View style={styles.bodyView}>
      {places ? (
        <FlatList
          data={places}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(place) => {
            return (
              <Place
                place={place}
                setLoading={setLoading}
                toastRef={toastRef}
                setReload={setReload}
                navigation={navigation}
              />
            );
          }}
        />
      ) : (
        <View style={styles.placeLoader}>
          <ActivityIndicator size="large" />
          <Text style={{ textAlign: "center" }}>Cargando lugares</Text>
        </View>
      )}
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loader isVisible={loading} text="Deleting..." />
    </View>
  );
};

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  placeLoader: {
    marginTop: 10,
    marginBottom: 10,
  },
  place: {
    margin: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -30,
    backgroundColor: "#fff",
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
  },
  favorite: {
    marginTop: -35,
    backgroundColor: 15,
    padding: 15,
    borderRadius: 100,
  },
});

export default FavoritesScreen;
