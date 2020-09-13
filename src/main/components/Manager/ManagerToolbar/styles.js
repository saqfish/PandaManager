const style = dark => ({
  container: {
    backgroundColor: dark ? "#2B2B2B" : "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: 2
  },
  form: {
    backgroundColor: dark ? "#303030" : "#ffffff",
    display: "flex",
    alignItems: "center"
  },
  delayForm: {
    backgroundColor: dark ? "#32903a" : "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "2px 10px",
    marginRight: 5
  },
  preDelayForm: {
    backgroundColor: dark ? "#B13E6E" : "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "2px 10px",
    marginRight: 5
  },
  input: {
    paddingLeft: 6,
    width: 80
  }
});

export default style;
