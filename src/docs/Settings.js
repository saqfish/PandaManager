import React, { useEffect, useState } from "react";
const ReactMarkdown = require("react-markdown/with-html");

import { makeStyles } from "@material-ui/core/styles";

import settingsmd from "./files/settings.md";

const useStyles = makeStyles(() => ({
  markdown: {
    paddingLeft: 10
  }
}));

const Settings = () => {
  const [markdown, setMarkdown] = useState("");

  const classes = useStyles();

  useEffect(() => {
    getMarkdown(settingsmd);
  }, []);

  const getMarkdown = path => {
    fetch(path)
      .then(res => res.text())
      .then(res => {
        setMarkdown(res);
      });
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
      <div style={{ width: "100%", maxHeight: "100vh", overflow: "auto" }}>
        <ReactMarkdown
          className={classes.markdown}
          source={markdown}
          escapeHtml={false}
        />
      </div>
    </div>
  );
};

export default Settings;
