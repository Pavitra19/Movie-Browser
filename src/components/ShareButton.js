import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";

export default function ShareButton(props) {
  const { favs } = props;
  const [copied, setCopied] = useState(false);

  const getLink = () => {
    const imdbIDs = favs.map((movie) => movie.imdbID);
    const baseURL =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    const params = `?favourites=${imdbIDs.join(",")}`;
    navigator.clipboard.writeText(`${baseURL}${params}`);

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Button
      variant="contained"
      color={!copied ? "secondary" : "primary"}
      className="share-btn"
      startIcon={!copied && <ShareIcon />}
      onClick={() => {
        getLink();
      }}
    >
      {!copied ? "Share Link" : "Copied!"}
    </Button>
  );
}
