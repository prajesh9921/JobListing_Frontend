import React from "react";
import styles from "./header.module.css";
import Shape1 from "../../assets/shape1.png";
import Shape2 from "../../assets/shape2.png";
import Button from "../Button/button";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let token = localStorage.getItem("token");
  let userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    let namevalue;
    if (/\s/.test(name)) {
      const temp = name.split(' ');
      namevalue = temp[0][0] + temp[1][0];
  } else {
    const temp = [...name];
    namevalue = temp[0] + temp[1];
  }
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 50,
        height: 50,
      },
      children: namevalue.toUpperCase()

    };
  }

  return (
    <header>
      <h2 style={{cursor: 'pointer'}} onClick={() => navigate('/mainPage')}>Jobfinder</h2>

      {token ? (
        <div className={styles.loggedDiv}>
          <p onClick={handleLogout} className={styles.ctrlBtn}>Logout</p>
          <p className={styles.ctrlBtn}>Hello! Recruiter</p>
          <Avatar {...stringAvatar(userEmail)} />
        </div>
      ) : (
        <div className={styles.btns}>
          <Button title="Login" onClick={() => navigate('/login')} type="outlined" />
          <Button title="Register" type="contained" onClick={() => navigate('/register')}/>
        </div>
      )}

      <img src={Shape1} alt="Shape1" className={styles.shape1} />
      <img src={Shape2} alt="Shape2" className={styles.shape2} />
    </header>
  );
};

export default Header;
