const style = dark => {
  return {
    toolbar: {
      flexGrow: 1,
      backgroundColor: dark == "dark" ? "#121212" : "#3f51b5"
    },
    title: { flexGrow: 1 },
    main: { color: "white", padding: 0 },
    settings: { color: "white", padding: 0 },
  };
};

export default style;
