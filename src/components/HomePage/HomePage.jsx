import { useEffect, useState, useContext } from "react";
import { Context } from "../../App";

import Navbar from "../Navbar/Navbar";

import "./styles.css";

const HomePage = () => {
  const { localStorageUser } = useContext(Context);

  console.log(localStorageUser);
  
  return (
    <div className="home-page">
      <Navbar />
    </div>
  );
};
export default HomePage;
