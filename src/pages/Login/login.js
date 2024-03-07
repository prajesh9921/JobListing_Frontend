import React, { useState } from "react";
import styles from "./login.module.css";
import LoginImage from "../../assets/Login-img.png";
import {
  InputBox,
  LButton,
} from "../../components/Login/login&RegisterComponents";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../apis/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    navigate("/register");
  };

  const handleFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setloginData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      return toast.error("Email and password field cannot be empty");
    }

    const response = await LoginApi(
      loginData.email,
      loginData.password,
      setLoading
    );

    if (response) {
      if (response?.message === "user login successfull") {
        navigate("/mainPage", {state: {token: response.token}});
      } else {
        toast.error(response.message);
      }
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className={styles.parent}>
      {/* Left Part */}
      <div className={styles.leftPart}>
        <h1>Already have an account?</h1>
        <p className={styles.subText}>Your personal job finder is here</p>
        <InputBox placeholder="Email" name="email" onChange={handleFormData} />

        <InputBox
          placeholder="Password"
          name="password"
          onChange={handleFormData}
          type="password"
        />

        <LButton
          title="Sign in"
          onClick={handleLogin}
          style={styles.btn}
          loading={loading}
        />

        <p className={styles.promt}>
          Don’t have an account? <span onClick={handleNavigate}>Sign Up</span>
        </p>
      </div>

      {/* Right Part */}
      <div
        style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={styles.rightPart}
      >
        <p>Your Personal Job Finder</p>
      </div>
    </div>
  );
};

export default LoginPage;
