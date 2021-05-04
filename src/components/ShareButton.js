import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";

export default function ShareButton(props) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);

    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Button
      variant="contained"
      color={!copied ? "secondary" : "primary"}
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
