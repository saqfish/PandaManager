const container = {
  margin: "10px"
};

const cardStyles = (isDark, enabled, selected) => {
  const darkBg = selected ? "#055e68" : "#121212";
  const lightBg = selected ? "#055e68" : "#3f51b5";

  const enabledBg = isDark ? darkBg : lightBg;
  const disabledBg = isDark ? "#4c4c4c" : "#ffffff";

  return {
    root: {
      backgroundColor: enabled ? enabledBg : disabledBg
    },
    avatar: {
      color: isDark ? "white" : "black",
      backgroundColor: isDark ? "#3f51b5" : "#e0e0e0"
    },
    deleteButton: {
      color: "white",
      padding: 0
    },
    title: {
      color: enabled ? "white" : isDark ? "white" : "black",
      textOverflow: "ellipsis",
      maxWidth: "100px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block"
    },
    subheader: {
      color: enabled ? "white" : isDark ? "white" : "black",
      textOverflow: "ellipsis",
      maxWidth: "150px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block"
    },
    description: {
      color: enabled ? "white" : isDark ? "white" : "black",
      textOverflow: "ellipsis",
      maxWidth: "250px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block"
    }
  };
};

export { container, cardStyles };
