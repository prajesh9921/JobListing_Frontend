import React from "react";
import { Paper } from "@mui/material";
import styles from "./jobsCard.module.css";
import Button from "@mui/material/Button";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import IndiaFlag from "../../assets/indiaFlag.png";
import { useNavigate } from "react-router-dom";

const JobCard = ({ data, idx, selected, setSelectedJob }) => {

  const navigate = useNavigate();

  const handleViewDetails = () => {
    const url = `/jobDetails/${data?._id}`
    navigate(url);
  }

  return (
    <div onClick={() => setSelectedJob(idx)} style={{cursor: 'pointer'}}>
      <Paper elevation={3} className={styles.container}>
        {selected === idx ? <div className={styles.selected}></div>: null}

        <div className={styles.details}>
          <div className={styles.companyLogo}>
            {data?.logoUrl ? <img src={data?.logoUrl} alt="" /> : <p style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>Logo</p>}
          </div>
          {/* Details */}
          <div className={styles.detailsDiv}>
            <h3>{data.title}</h3>
            <div className={styles.sizeMoneyLocDiv}>
              <p>
                <PeopleIcon className={styles.smldIcon} />
                11-50
              </p>
              <p>
                <CurrencyRupeeIcon className={styles.smldIcon} /> {data?.salary}
              </p>
              <p>
                <img src={IndiaFlag} alt="IndianFlag" /> {data?.location}
              </p>
            </div>

            <div className={styles.typeroleDiv}>
              <p>{data?.jobType}</p>
              <p>{data?.duration}</p>
            </div>
          </div>
        </div>

        <div className={styles.spacer}></div>

        {/* Skills and view details */}
        <div className={styles.skillsAndViewDetails}>
          <div className={styles.skillsDiv}>
            {data?.skills?.slice(0, 5).map((item) => (
              <div className={styles.skillsCard}>{item}</div>
            ))}
          </div>
          <Button onClick={handleViewDetails} variant="contained" className={styles.viewDetailsbtn}>
            View details
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default JobCard;
