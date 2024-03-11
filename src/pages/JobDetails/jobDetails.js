import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import Paper from "@mui/material/Paper";
import styles from "./jobDetails.module.css";
import Salary from "../../assets/money.png";
import Calender from "../../assets/calender.png";
import Card from "../../components/JobDetails/card";
import { useParams } from "react-router-dom";
import { toGetJobDetails } from "../../apis/jobs";
import { toast } from "react-toastify";
import { toGetTimeAgo } from "../../components/DateFormatter/dateFormatter";
import { useNavigate } from "react-router-dom";

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobid } = useParams();
  const [jobDetails, setJobDetails] = useState();

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    if (!jobid) return;
    const response = await toGetJobDetails(jobid);
    if (response) {
      setJobDetails(response);
    } else {
      toast.error("Error fetching job details");
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      {/* Job Title */}
      <Paper elevation={3} sx={{ borderRadius: 0 }} className={styles.jobTitle}>
        <p>{jobDetails?.title}</p>
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 0 }} className={styles.details}>
        <div className={styles.subDetails}>
          <p>{toGetTimeAgo(jobDetails?.updatedAt)}</p>
          <p>{jobDetails?.jobType}</p>
          {jobDetails?.logoUrl ? (
            <img src="https://images.unsplash.com/photo-1623230590824-f39e31a0a608?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Company logo" />
          ) : null}
          <p>{jobDetails?.companyName}</p>
        </div>

        <div className={styles.jobRoleDiv}>
          <div className={styles.jobRole}>
            <h1>{jobDetails?.title}</h1>
            <p>{jobDetails?.location}</p>
          </div>

          <button onClick={() => navigate('/job-add-page')} className={styles.editBtn}>Edit Job</button>
        </div>

        <div className={styles.jobInfo}>
          <div>
            <p className={styles.infoText}>
              <img className={styles.infoImg} src={Salary} alt="salary" />
              Salary
            </p>
            <p className={styles.calender}>Rs ${jobDetails?.salary}/month</p>
          </div>

          <div>
            <p className={styles.infoText}>
              <img className={styles.infoImg} src={Calender} alt="salary" />
              Duration
            </p>
            <p className={styles.salary}>{jobDetails?.duration}</p>
          </div>
        </div>
        <Card title="About Company" data={jobDetails?.aboutCompnay} />
        <Card
          title="About the job/internship"
          data={jobDetails?.jobDescription}
        />
        <Card data={jobDetails?.skills} type="chip" />
        <Card
          data={jobDetails?.additionalInformation}
          title="Additional Information"
        />
      </Paper>
    </div>
  );
};

export default JobDetails;
