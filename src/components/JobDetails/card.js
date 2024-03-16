import React from "react";
import Chip from "@mui/material/Chip";

const Card = ({ data = "", type = "text", title }) => {
  return (
    <div style={{marginBottom: 30}}>
      <h3>{title}</h3>
      {type === "text" ? (
        <p style={{fontSize: 12, marginTop: 10}}>{data}</p>
      ) : (
        <div style={{marginTop: 10}}>
          {data
            ? data?.map((item) => (
                <Chip
                  label={item}
                  sx={{ backgroundColor: "#FFEEEE", marginRight: 1 }}
                />
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default Card;
