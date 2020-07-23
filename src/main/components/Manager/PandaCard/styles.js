const container = {
  margin: "10px"
};

const cardStyles = (isDark, enabled, selected) => {
  const darkBg = selected ? "#055e68" : "#263859";
  const lightBg = selected ? "#055e68": "#4c4c4c";

  const enabledBg = isDark ? darkBg : lightBg;
  const disabledBg = isDark ? "#4c4c4c" : "white";

  return {
    root: {
      backgroundColor: enabled ? enabledBg : disabledBg
    },
    deleteButton: {
      color: "white",
      padding: 0
    },
    title: {
      color: "white",
      textOverflow: "ellipsis",
      maxWidth: "100px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block"
    },
    subheader: {
      color: "white",
      textOverflow: "ellipsis",
      maxWidth: "150px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block"
    },
    description: {
      color: "white",
      textOverflow: "ellipsis",
      maxWidth: "200px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block"
    }
  };
};

export { container, cardStyles };
