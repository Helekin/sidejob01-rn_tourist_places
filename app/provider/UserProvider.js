import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { UserContext } from "../context/UserContext";

import baseURL from "../utils/baseUrl";

const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("jwt");

      if (token) {
        axios
          .get(`${baseURL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setUser(response.data);
          });
      }
    })();
  }, []);

  const login = (userInfo) => {
    setUser(userInfo);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
