import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/header";

const MainPage = ({ route }) => {
  const { state } = useLocation();
  // const { token } = state;

  return (
    <div>
      <Header/>
    </div>
  );
};

export default MainPage;
