import React from "react";

import UserProvider from "./app/provider/UserProvider";

import MainNavigation from "./app/navigation/MainNavigation";

export default function App() {
  return (
    <UserProvider>
      <MainNavigation />
    </UserProvider>
  );
}
