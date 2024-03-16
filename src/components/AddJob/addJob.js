import React from "react";
import styles from "./addJob.module.css";

const InputBox = ({ placeholder, onChange, name, value }) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      className={styles.inputBox}
      value={value}
    />
  );
};

const TextArea = ({ placeholder, onChange, name, value }) => {
  return (
    <textarea
      className={styles.textarea}
      name={name}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      rows="5"
      value={value}
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
  value
}) => {
  return (
    <div className={`${styles.inputDiv} ${style}`}>
      <label htmlFor="Company Name">{label}</label>
      {type === "textarea" ? (
        <TextArea placeholder={placeholder} onChange={onChange} name={name} value={value}/>
      ) : (
        <InputBox
          name={name}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          value={value}
        />
      )}
    </div>
  );
};

const CustomDropdownMenu = ({stretch = false, label, name, onChange, data, defaultValue, style, value}) => {
    return (
        <div className={styles.inputDiv}>
            {label ? <label htmlFor="jobtype">{label}</label> : null}
            <select value={value} onChange={(val) => onChange(val)} name={name} className={stretch ? `${styles.dropdownFullWidth} ${style}` : null}>
                <option className={styles.dropdownDefault} disabled selected>{defaultValue}</option>
                {data?.map(item => <option>{item}</option>)}
            </select>
        </div>
    )
}

export { CustomInputBox, CustomDropdownMenu };
