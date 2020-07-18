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

export { containerStyle, tableStyles };
