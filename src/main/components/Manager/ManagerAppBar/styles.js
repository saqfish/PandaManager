const styles = theme => {
  return {
    toolbarStyle: {
      flex: 0,
      color: "white",
      backgroundColor: theme.palette.type == "dark" ? "#121212" : "#3f51b5"
    },
    navigationStyle: {
      marginRight: theme.spacing(2)
    },
    toolbarButtons: {},
    title: {
      paddingLeft: 12,
      flexGrow: 1
    }
  };
};

export default styles;
