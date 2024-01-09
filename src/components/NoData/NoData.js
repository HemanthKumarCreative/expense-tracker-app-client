import React from "react";
import classes from "./NoData.module.css";

const NoDataComponent = ({ message }) => {
  const { noDataComponent } = classes;
  return (
    <div className={noDataComponent}>
      {/* <img src="placeholder-image.png" alt="No Data" /> */}
      <p>{message}</p>
    </div>
  );
};

export default NoDataComponent;
