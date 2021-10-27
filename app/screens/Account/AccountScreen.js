import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../context/UserContext";

import Loader from "../../components/UI/Loader";

import GuestUserScreen from "./GuestUserScreen";
import LoggedUserScreen from "./LoggedUserScreen";

const AccountScreen = () => {
  const { user } = useContext(UserContext);

  const [login, setLogin] = useState(null);

  useEffect(() => {
    !user ? setLogin(false) : setLogin(true);
  }, [user]);

  if (login === null) return <Loader isVisible={true} text="Cargando..." />;

  return login ? <LoggedUserScreen /> : <GuestUserScreen />;
};

export default AccountScreen;
