const cardStyles = enabled => {
  return {
    container: {
      margin: "10px"
    },
    root: {
      backgroundColor: enabled ? "#263859" : "#4c4c4c"
    },
    deleteButton: {
      padding: 0
    },
    title: {
      textOverflow: "ellipsis",
      maxWidth: "100px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block"
    },
    subheader: {
      textOverflow: "ellipsis",
      maxWidth: "150px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block"
    },
    description: {
      textOverflow: "ellipsis",
      maxWidth: "200px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block"
    }
  };
};

export {cardStyles};
