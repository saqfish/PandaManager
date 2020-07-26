const styles = theme => {
  return {
    toolbar: {
      flex: 0,
      color: "white",
      backgroundColor: theme.palette.type == "dark" ? "#121212" : "#3f51b5"
    },
    title: {
      paddingLeft: 12,
      flexGrow: 1
    },
    buttons: { },
    cycle: {
      color: "white"
    },
    add: {
      color: "white"
    },
    expand: {
      color: "white"
    },
  };
};

export default styles;
