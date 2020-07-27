const style = dark => ({
  container: {
    backgroundColor: dark ? "#303030" : "#ffffff",
    display: "flex",
    alignItems: "center"
  },
  form: {
    backgroundColor: dark ? "#303030" : "#ffffff",
    display: "flex",
    alignItems: "center"
  },
  input: {
    paddingLeft: 6,
    width: 80
  }
});

export default style;
