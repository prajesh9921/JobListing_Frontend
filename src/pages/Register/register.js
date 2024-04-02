import React, { useState } from "react";
import styles from "./register.module.css";
import LoginImage from "../../assets/Login-img.png";
import {
  InputBox,
  LButton,
} from "../../components/Login/login&RegisterComponents";
import { useNavigate } from "react-router-dom";
import { RegisterApi } from "../../apis/auth";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    checkbox: false,
  });

  const handleNavigate = () => {
    navigate("/login");
  }

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email || !formData.password || !formData.mobile){
      return toast.error("Required all fields");
    } else if (!emailRegex.test(formData.email)) {
      return toast.error("Enter a valid email address");
    } 
    else if (!formData.checkbox) {
      return toast.error("Please check the box");
    }

    const response = await RegisterApi(formData.name, formData.email, formData.password, formData.mobile, setLoading);
    if (response) {
      if (response.message === "User created successfully") {
        toast.success(response.message + " Redirecting to login page");
        setTimeout(() => {
          navigate("/login")
        }, 4000)
      } else {
        toast(response.message);
      } 
    } else {
      toast("User already exists");
    }
  }

  return (
    <div className={styles.parent}>
      {/* Left Part */}
      <div className={styles.leftPart}>
        <h1>Create an account</h1>
        <p className={styles.subText}>Your personal job finder is here</p>
        <form onSubmit={handleFormSubmit}>
          <InputBox placeholder="Name" name="name" onChange={handleFormData} />

          <InputBox
            placeholder="Email"
            name="email"
            onChange={handleFormData}
            type="text"
          />

          <InputBox
            placeholder="Mobile"
            name="mobile"
            onChange={handleFormData}
            type="text"
          />

          <InputBox
            placeholder="Password"
            name="password"
            onChange={handleFormData}
            type="password"
          />

          <p className={styles.aggrement}>
            <input
              type="checkbox"
              name="checkbox"
              onChange={(e) =>
                setFormData({ ...formData, checkbox: e.target.checked })
              }
            />
            By creating an account, I agree to our terms of use and privacy
            policy
          </p>
        </form>

        <LButton
          title="Sign in"
          onClick={handleFormSubmit}
          style={styles.btn}
          loading={loading}
        />

        <p className={styles.promt}>
          Already have an account?? <span onClick={handleNavigate}>Sign In</span>
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

export default RegisterPage;
