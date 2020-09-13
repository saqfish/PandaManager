const style = isDark => {
  return {
    root: {
      minWidth: 500,
      display: "flex",
      flexDirection: "column"
    },
    avatar: {
      color: isDark ? "white" : "black",
      backgroundColor: isDark ? "#3f51b5" : "#e0e0e0"
    },
    list: {
      maxHeight: 300,
      overflowY: "auto"
    },
    cycle: {
      display: "flex",
      justifyContent: "flex-end"
    },
    actions: {},
    delayForm: {
      backgroundColor: isDark ? "#32903a" : "#ffffff",
      display: "flex",
      alignItems: "center",
      padding: "2px 10px",
      marginRight: 10
    },
    preDelayForm: {
      backgroundColor: isDark ? "#B13E6E" : "#ffffff",
      display: "flex",
      alignItems: "center",
      padding: "2px 10px",
      marginRight: 5
    },
    input: {
      paddingLeft: 6,
      width: 80
    }
  };
};

export default style;
