import React from "react";
import { tableStyles } from "./styles";

import { AccessTime, Search, Clear } from "@material-ui/icons";

const tableIcons = { Clear, Search, ResetSearch: Clear };

const table = {
  title: "Pandas",
  icons: tableIcons,
  style: tableStyles.style,
  options: {
    rowStyle: tableStyles.rowStyle,
    headerStyle: tableStyles.headerStyle,
    showTitle: false,
    detailPanelType: "single",
    padding: "dense",
    paging: false,
    showFirstLastPageButtons: false,
    addRowPosition: "first"
  },
  localization: {
    body: { emptyDataSourceMessage: "" },
    pagination: {
      labelDisplayedRows: ""
    }
  },
  columns: [
    {
      align: "left",
      title: "Selected",
      field: "selected",
      render: () => <AccessTime/>,
      cellStyle: rowData => tableStyles.selected(rowData)
    },
    {
      align: "left",
      title: "Req name/id, Hit ID",
      field: "name",
      cellStyle: tableStyles.name
    },
    {
      align: "left",
      title: "Description",
      field: "description",
      cellStyle: tableStyles.description
    }
  ]
};

export { table };
