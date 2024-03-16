import React, { useState } from "react";
import styles from "./addJob.module.css";
import {
  CustomInputBox,
  CustomDropdownMenu,
} from "../../components/AddJob/addJob";
import { Jobtype, Skills } from "../../utils/constants";
import Button from "@mui/material/Button";
import Chip from "../../components/Chip/chip";
import { toCreateJob, toEditJob } from "../../apis/jobs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner'
import { useLocation } from "react-router-dom";

const JobDefinePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, edit } = state;
  const [loading, setLoading] = useState(false);
  const userID = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    createdBy: userID,
    companyName: data?.companyName || "",
    title: data?.title || "",
    jobDescription: data?.jobDescription || "",
    logoUrl: data?.logoUrl || "",
    salary: data?.salary || "",
    jobType: data?.jobType || "",
    location: data?.location || "",
    aboutCompnay: data?.aboutCompnay || "",
    additionalInformation: data?.additionalInformation || "",
    duration: data?.duration || "",
    skills: data?.skills || [],
  });

  const handleChange = (e) => {
    if (e.target.name === "skills") {
      if (!formData.skills.includes(e.target.value)) {
        const temp = formData.skills;
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

    let response;

    if (edit) {
      response = await toEditJob(formData, setLoading, data?._id)
    } else {
      response = await toCreateJob(formData, setLoading);
    }

    if (response) {
      setTimeout(( ) => {
        navigate('/mainPage')
      },3000)
      return toast.success(response.message);
    }
    return edit ? toast.error("Error editing job please try again after some time") : toast.error("Error creating job please try again after some time");
  };

  const handleCancel = () => {
    navigate('/mainPage');
  }

  return (
    <div className={styles.container}>
      {/* left part */}
      <div className={styles.leftPart}>
        <h2 className={styles.leftPartTitle}>Add job description</h2>
        <CustomInputBox
          label="Company Name"
          name="companyName"
          value={formData?.companyName}
          placeholder="Enter your company name here"
          onChange={handleChange}
        />
        <CustomInputBox
          label="Add logo URL"
          name="logoUrl"
          placeholder="Enter the link"
          onChange={handleChange}
          value={formData?.logoUrl}
        />
        <CustomInputBox
          label="Job position"
          placeholder="Enter job position"
          onChange={handleChange}
          name="title"
          value={formData?.title}
        />
        <CustomInputBox
          label="Monthly salary"
          placeholder="Enter Amount in rupees"
          onChange={handleChange}
          name="salary"
          value={formData?.salary}
        />
        <CustomInputBox
          label="Location"
          placeholder="Enter Location"
          onChange={handleChange}
          name="location"
          value={formData?.location}
        />
        <CustomInputBox
          label="Duration"
          placeholder="Job duration ex: (2 years)"
          onChange={handleChange}
          name="duration"
          value={formData?.duration}
        />
        <CustomDropdownMenu
          onChange={handleChange}
          defaultValue="Select JobType"
          label="Job Type"
          data={Jobtype}
          name="jobType"
          value={formData?.jobType}
        />
        <CustomInputBox
          style={styles.texareaLabel}
          type="textarea"
          label="Job Description"
          placeholder="Type the job description"
          onChange={handleChange}
          name="jobDescription"
          value={formData?.jobDescription}
        />
        <CustomInputBox
          style={styles.texareaLabel}
          type="textarea"
          label="About Company"
          placeholder="Type about your company"
          onChange={handleChange}
          name="aboutCompnay"
          value={formData?.aboutCompnay}
        />
        <CustomInputBox
          type="textarea"
          label="Information"
          placeholder="Enter the additional information"
          onChange={handleChange}
          name="additionalInformation"
          value={formData?.additionalInformation}
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
        <h2 className={styles.rightPartTitle}>Recruiter add job details here</h2>
      </div>
    </div>
  );
};

export default JobDefinePage;
