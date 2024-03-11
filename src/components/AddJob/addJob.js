import React from "react";
import styles from "./addJob.module.css";

const InputBox = ({ placeholder, onChange, name }) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      className={styles.inputBox}
    />
  );
};

const TextArea = ({ placeholder, onChange, name }) => {
  return (
    <textarea
      className={styles.textarea}
      name={name}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      rows="5"
    ></textarea>
  );
};

const CustomInputBox = ({
  type = "input",
  placeholder,
  onChange,
  style,
  name,
  label,
}) => {
  return (
    <div className={`${styles.inputDiv} ${style}`}>
      <label htmlFor="Company Name">{label}</label>
      {type === "textarea" ? (
        <TextArea placeholder={placeholder} onChange={onChange} name={name} />
      ) : (
        <InputBox
          name={name}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />
      )}
    </div>
  );
};

const CustomDropdownMenu = ({stretch = false, label, name, onChange, data, defaultValue}) => {
    return (
        <div className={styles.inputDiv}>
            <label htmlFor="jobtype">{label}</label>
            <select onChange={(val) => onChange(val)} name={name} className={stretch ? styles.dropdownFullWidth : null}>
                <option className={styles.dropdownDefault} disabled selected>{defaultValue}</option>
                {data?.map(item => <option>{item}</option>)}
            </select>
        </div>
    )
}

export { CustomInputBox, CustomDropdownMenu };
