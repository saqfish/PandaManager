import React, { useEffect, useState } from "react";
const ReactMarkdown = require("react-markdown/with-html");

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import popupmd from "./files/popup.md";

import style from "./styles";

const Popup = () => {
  const [markdown, setMarkdown] = useState("");

  const useStyles = makeStyles(style);
  const classes = useStyles();

  useEffect(() => {
    getMarkdown(popupmd);
  }, []);

  const getMarkdown = path => {
    fetch(path)
      .then(res => res.text())
      .then(res => {
        setMarkdown(res);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.ss}>
        <img className={classes.ssimg} src="img/doc/popup/1.png" />
        <img className={classes.ssimg} src="img/doc/popup/2.png" />
        <img className={classes.ssimg} src="img/doc/popup/3.png" />
      </div>
      <Container className={classes.markdownContainer}>
        <ReactMarkdown
          className={classes.markdown}
          source={markdown}
          escapeHtml={false}
        />
      </Container>
    </div>
  );
};

export default Popup;
