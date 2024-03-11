import React, { useState } from "react";
import styles from "./addJob.module.css";
import {
  CustomInputBox,
  CustomDropdownMenu,
} from "../../components/AddJob/addJob";
import { Jobtype, Skills } from "../../utils/constants";
import Button from "@mui/material/Button";
import Chip from "../../components/Chip/chip";
import { toCreateJob } from "../../apis/jobs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner'

const JobDefinePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    jobDescription: "",
    logoUrl: "",
    salary: "",
    jobType: "",
    location: "",
    aboutCompnay: "",
    additionalInformation: "",
    duration: "",
    skills: [],
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "skills") {
      if (!formData.skills.includes(e.target.value)) {
        const temp = formData.skills;
        console.log(temp);
        temp.push(e.target.value);
        setFormData({ ...formData, skills: temp });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const removeSkills = (idx) => {
    const temp = formData.skills;
    temp.splice(idx, 1);
    setFormData({ ...formData, skills: temp });
  };

  const handleAddJob = async () => {
    if (
      !formData.aboutCompnay ||
      !formData.skills ||
      !formData.title ||
      !formData.aboutCompnay ||
      !formData.additionalInformation ||
      !formData.companyName ||
      !formData.jobDescription ||
      !formData.duration ||
      !formData.jobType ||
      !formData.location
    ) {
      return toast.error("Required all fields except logo URL");
    }

    const response = await toCreateJob(formData, setLoading);

    if (response) {
      setTimeout(( ) => {
        navigate('/mainPage')
      },3000)
      return toast.success(response.message);
    }
    return toast.error("Error creating job please try again after some time");
  };

  const handleCancel = () => {
    navigate('/mainPage');
  }

  return (
    <div className={styles.container}>
      {/* left part */}
      <div className={styles.leftPart}>
        <h2>Add job description</h2>
        <CustomInputBox
          label="Company Name"
          name="companyName"
          placeholder="Enter your company name here"
          onChange={handleChange}
        />
        <CustomInputBox
          label="Add logo URL"
          name="logoUrl"
          placeholder="Enter the link"
          onChange={handleChange}
        />
        <CustomInputBox
          label="Job position"
          placeholder="Enter job position"
          onChange={handleChange}
          name="title"
        />
        <CustomInputBox
          label="Monthly salary"
          placeholder="Enter Amount in rupees"
          onChange={handleChange}
          name="salary"
        />
        <CustomInputBox
          label="Location"
          placeholder="Enter Location"
          onChange={handleChange}
          name="location"
        />
        <CustomInputBox
          label="Duration"
          placeholder="Job duration ex: (2 years)"
          onChange={handleChange}
          name="duration"
        />
        <CustomDropdownMenu
          onChange={handleChange}
          defaultValue="Select JobType"
          label="Job Type"
          data={Jobtype}
          name="jobType"
        />
        <CustomInputBox
          style={styles.texareaLabel}
          type="textarea"
          label="Job Description"
          placeholder="Type the job description"
          onChange={handleChange}
          name="jobDescription"
        />
        <CustomInputBox
          style={styles.texareaLabel}
          type="textarea"
          label="About Company"
          placeholder="Type about your company"
          onChange={handleChange}
          name="aboutCompnay"
        />
        <CustomInputBox
          label="Information"
          placeholder="Enter the additional information"
          onChange={handleChange}
          name="additionalInformation"
        />
        <CustomDropdownMenu
          onChange={handleChange}
          stretch={true}
          defaultValue="Enter the must have skills"
          label="Skills Required"
          data={Skills}
          name="skills"
        />

        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "20%" }}></div>
          <div style={{ display: "flex", flexWrap: "wrap", flex: 1 }}>
            {formData?.skills.map((item, index) => (
              <Chip label={item} idx={index} onClose={removeSkills} />
            ))}
          </div>
        </div>

        <div className={styles.btns}>
          <Button onClick={handleCancel} variant="outlined" className={styles.cancelBtn}>
            Cancel
          </Button>
          <Button
            onClick={handleAddJob}
            variant="contained"
            className={styles.addJobBtn}
          >
            {loading ? <TailSpin visible={loading} height="30" width="30" color="#fff"/> : "+ Add Job"}
          </Button>
        </div>
      </div>

      {/* right part */}
      <div className={styles.rightPart}>
        <h2>Recruiter add job details here</h2>
      </div>
    </div>
  );
};

export default JobDefinePage;
