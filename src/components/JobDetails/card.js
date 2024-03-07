import React from "react";
import Chip from "@mui/material/Chip";

const Card = ({ data = "", type = "text", title }) => {
  return (
    <div>
      <h3>{title}</h3>
      {type === "text" ? (
        <p>{data}</p>
      ) : (
        <div>
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
