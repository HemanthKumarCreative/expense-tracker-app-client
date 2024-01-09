import React from "react";
import classes from "./Loader.module.css";

const CSSLoader = () => {
  const { loaderContainer, loader } = classes;
  return (
    <div className={loaderContainer}>
      <div className={loader}></div>
    </div>
  );
};

export default CSSLoader;
