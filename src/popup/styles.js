const style = () => {
  return {
    root: {
      minWidth: 500,
      display: "flex",
      flexDirection: "column"
    },
    list: {
      maxHeight: 300,
      overflowY: 'auto',
    },
    cycle: {
      display: "flex",
      justifyContent: "flex-end",
    },
    actions: { }
  };
};

export default style;
