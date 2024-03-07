import React from "react";
import styles from "./header.module.css";
import Shape1 from "../../assets/shape1.png";
import Shape2 from "../../assets/shape2.png";
import Button from "../Button/button";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  let token = localStorage.getItem("token");

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 50,
        height: 50,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <header>
      <h2>Jobfinder</h2>

      {token ? (
        <div className={styles.loggedDiv}>
          <p className={styles.ctrlBtn}>Logout</p>
          <p className={styles.ctrlBtn}>Hello! Recruiter</p>
          <Avatar {...stringAvatar("Kent Dodds")} />
        </div>
      ) : (
        <div className={styles.btns}>
          <Button title="Login" type="outlined" />
          <Button title="Register" type="contained" />
        </div>
      )}

      <img src={Shape1} alt="Shape1" className={styles.shape1} />
      <img src={Shape2} alt="Shape2" className={styles.shape2} />
    </header>
  );
};

export default Header;
