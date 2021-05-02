import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

export default function Error(props) {
  const { errorMessage } = props;
  return (
    <div className="error-div">
      <ErrorOutlineIcon className="error-icon" />
      <h2>{errorMessage}</h2>
    </div>
  );
}
