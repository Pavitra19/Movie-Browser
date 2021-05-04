import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";

export default function ShareButton(props) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      className="share-btn"
      startIcon={!copied && <ShareIcon />}
      onClick={() => {
        handleClick();
        console.log("window: ", window.location.href);
      }}
    >
      {!copied ? "Share Link" : "Copied!"}
    </Button>
  );
}
