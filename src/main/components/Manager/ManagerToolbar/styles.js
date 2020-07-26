const style = dark => ({
  container: {
    backgroundColor: dark? "#303030": "#ffffff",
    display: "flex",
    alignItems: "center"
  },
  form: {
    padding: 6,
    display: "flex",
    alignItems: "center"
  },
  input: {
    width: 80
  }
});

export default style;
