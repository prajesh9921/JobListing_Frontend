import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import styles from "./mainPage.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Skills } from "../../utils/constants";
import Chip from "../../components/Chip/chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/JobsCard/jobsCard";
import { toGetAllJobs } from "../../apis/jobs";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const MainPage = ({ route }) => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    title: "",
    skills: [],
  });
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(0);

  const handleOnchange = (e) => {
    if (e.target.name === "skills") {
      if (!filterData.skills.includes(e.target.value)) {
        const temp = filterData.skills;
        temp.push(e.target.value);
        setFilterData({ ...filterData, skills: temp });
      }
    } else {
      setFilterData({ ...filterData, title: e.target.value });
    }
  };

  const removeSkills = (idx) => {
    const temp = filterData.skills;
    temp.splice(idx, 1);
    setFilterData({ ...filterData, skills: temp });
  };

  const handleAddJob = () => {
    if (token) {
      navigate("/job-add-page", {state: {data: null, edit: false}});
    } else {
      navigate("/login");
    }
  };

  const handleClear = () => {
    setFilterData({
      title: "",
      skills: [],
    });
  };

  const fetchJobData = async () => {
    const response = await toGetAllJobs(filterData, setLoading);
    if (response) {
      setJobData(response.data);
    } else {
      return toast.error("Error fetching jobs data. Please try again later");
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  return (
    <div>
      <Header />

      {/* Search DashBoard */}
      <Paper elevation={3} className={styles.dashboard}>
        {/* Search Bar */}
        <div className={styles.search}>
          <SearchIcon />
          <input
            type="text"
            value={filterData.title}
            name="title"
            onChange={handleOnchange}
            placeholder="Enter keywords"
            onKeyDown={e => e.key === 'Enter' ? fetchJobData() : null}
          />
        </div>

        {/* Filters */}
        <div className={styles.filter}>
          {/* Drop Down */}
          <select
            onChange={handleOnchange}
            className={styles.dropdown}
            name="skills"
          >
            <option className={styles.dropdownDefault} disabled selected>
              Skills
            </option>
            {Skills?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>

          <div className={styles.chipsDiv}>
            {filterData.skills.map((item, index) => (
              <Chip
                key={index}
                big={true}
                label={item}
                onClose={removeSkills}
              />
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#ED5353" }}
                className={styles.filterbtn}
                onClick={fetchJobData}
              >
                Apply Filter
              </Button>
              <Button variant="Outlined" onClick={handleClear}>
                Clear
              </Button>
            </div>
            <Button
              variant="contained"
              onClick={handleAddJob}
              className={styles.addJobbtn}
            >
              Add Job
            </Button>
          </div>
        </div>
      </Paper>

      {/* Jobs Cards */}
      <div className={styles.jobList}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TailSpin height={30} width={30} />
          </div>
        ) : (
          jobData?.map((item, index) => (
            <JobCard
              data={item}
              idx={index}
              selected={selectedJob}
              setSelectedJob={setSelectedJob}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MainPage;
