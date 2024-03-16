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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { LocalParking } from "@mui/icons-material";

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobid } = useParams();
  const [jobDetails, setJobDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const userID = localStorage.getItem('userId');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    if (!jobid) return;
    const response = await toGetJobDetails(jobid, setLoading);
    if (response) {
      setJobDetails(response);
    } else {
      toast.error("Error fetching job details");
    }
  };

  const Loader = () => {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* Job Title */}
          <Paper
            elevation={3}
            sx={{ borderRadius: 0 }}
            className={styles.jobTitle}
          >
            <p>{jobDetails?.title}</p>
          </Paper>

          <Paper
            elevation={3}
            sx={{ borderRadius: 0 }}
            className={styles.details}
          >
            <div className={styles.subDetails}>
              <p>{toGetTimeAgo(jobDetails?.updatedAt)}</p>
              <p>{jobDetails?.jobType}</p>
              {jobDetails?.logoUrl ? (
                <img
                  className={styles.companyLogo}
                  src={jobDetails?.logoUrl}
                  alt=""
                />
              ) : null}
              <p>{jobDetails?.companyName}</p>
            </div>

            <div className={styles.jobRoleDiv}>
              <div className={styles.jobRole}>
                <h1>{jobDetails?.title}</h1>
                <p>{jobDetails?.location}</p>
              </div>

              {loggedIn ? (
                <button
                  onClick={() => navigate("/job-add-page", {state: {data: jobDetails, edit: true}})}
                  className={userID === jobDetails?.createdBy ? styles.editBtn : styles.disabledEditBtn}
                  disabled={userID === jobDetails?.createdBy ? false : true}
                >
                  Edit Job
                </button>
              ) : null}
            </div>

            <div className={styles.jobInfo}>
              <div>
                <p className={styles.infoText}>
                  <img className={styles.infoImg} src={Salary} alt="salary" />
                  Salary
                </p>
                <p className={styles.calender}>
                  Rs ${jobDetails?.salary}/month
                </p>
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
            <Card
              data={jobDetails?.skills}
              title="Skill(s) required"
              type="chip"
            />
            <Card
              data={jobDetails?.additionalInformation}
              title="Additional Information"
            />
          </Paper>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
