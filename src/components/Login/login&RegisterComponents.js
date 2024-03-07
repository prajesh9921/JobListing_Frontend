import React from "react";
import styles from "./login&RegisterComponents.module.css";
import { TailSpin } from "react-loader-spinner";

const InputBox = ({
  placeholder = "Input Box",
  name,
  ref,
  style,
  onChange,
  type = "text"
}) => {
  return (
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      name={name}
      ref={ref}
      className={`${styles.inputBox} ${style}`}
    />
  );
};

const LButton = ({ title = "Button", onClick, style, loading=false }) => {
  return (
    <div className={`${styles.lbtn} ${style}`} onClick={onClick}>
      <TailSpin visible={loading} color="#fff" height={20} width={20}/>
      {!loading ? <p>{title}</p> : null}
    </div>
  );
};

export { InputBox, LButton };
