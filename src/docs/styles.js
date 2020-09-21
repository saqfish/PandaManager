const style = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  ss: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    padding: 20
  },
  ssimg: {
    "&:hover": {
      border: "green thin solid"
    },
    alignSelf: "center"
  },
  markdownContainer: {
    width: "100%",
    maxHeight: "100vh",
    overflow: "auto",
  },
  markdown: {
  }
};

export default style;
