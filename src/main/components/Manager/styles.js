const containerStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column"
};

const tableStyles = {
  style: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto"
  },
  headerStyle: {
    display: "none",
    position: "sticky",
    top: 0
  },
  rowStyle: {
    display: "none",
    position: "sticky",
    top: 0
  },
  actions: {
    maxWidth: "20px"
  },
  name: {
    maxWidth: "30vw",
    padding: 10
  },
  link: {
    maxWidth: "50vw",
    opacity: 0.3,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  cardContainerStyle: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
};

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

const messageDialogStyles = {
  card: {
    root: {}
  },
  cardActions: {
    root: {
      justifyContent: "flex-end"
    }
  },
  byeButton: {
    root: {}
  },
  msgInput: {
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400
    },
    input: {
      marginLeft: 6,
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  }
};

export { containerStyle, tableStyles, cardStyles, messageDialogStyles };
