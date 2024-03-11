import React from "react";
import styles from "./chip.module.css";

const Chip = ({ label = "Prajesh", onClose, idx }) => {
  return (
    <div className={styles.main}>
      <p className={styles.label}>{label}</p>
      <p className={styles.cross} onClick={() => onClose(idx)}>X</p>
    </div>
  );
};

export default Chip;
