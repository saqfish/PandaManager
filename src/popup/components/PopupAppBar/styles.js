const style = dark => {
  return {
    bar: {
      flexGrow: 1,
      backgroundColor: dark == "dark" ? "#121212" : "#3f51b5"
    },
    barButton: { color: "white", padding: 0 },
    title: { flexGrow: 1 }
  };
};

export default style;
