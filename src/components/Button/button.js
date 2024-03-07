import React from 'react';
import styles from './button.module.css';

export default function Button({type, title, onClick}) {
  return (
    <div onClick={onClick} className={type === "outlined" ? styles.outlinebtn : styles.containedbtn}>
        <p className={type === "outlined" ? styles.outlineText : styles.containedText}>{title}</p>
    </div>
  );
}
