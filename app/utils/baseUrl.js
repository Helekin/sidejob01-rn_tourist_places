import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS === "android"
    ? (baseURL = "https://sj01-tourist-places.herokuapp.com/api")
    : (baseURL = "https://sj01-tourist-places.herokuapp.com/api");
}

export default baseURL;
