import React from "react";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";

export default function ShareButton(props) {
  return (
    <Button
      variant="contained"
      color="secondary"
      className="share-btn"
      startIcon={<ShareIcon />}
      onClick={() => {
        alert("Copied!");
      }}
    >
      Share Link
    </Button>
  );
}
