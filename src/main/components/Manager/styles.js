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
  toolbarStyle: {
    display: "flex",
    justifyContent: "flex-end"
  },
  headerStyle: {
    display: "none",
    position: "sticky",
    top: 0
  },
  rowStyle: {
    display: "flex",
    verticalAlign: "center"
  },
  actions: {},
  enabled: {
    flex: 0
  },
  selected: selected => {
    console.log(selected);
    return {
      color: selected ? "green" : "white",
      flex: 0
    };
  },
  name: {
    flex: 0.5,
    maxWidth: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  link: {
    flex: 0.5,
    maxWidth: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    opacity: 0.3
  },
  description: {
    flex: 1,
    width: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    opacity: 0.3
  },
  cardContainerStyle: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
};

export { containerStyle, tableStyles };
