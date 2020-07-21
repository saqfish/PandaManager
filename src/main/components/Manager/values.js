import React from "react";
import { tableStyles } from "./styles";

import Checkbox from "@material-ui/core/Checkbox";
import { Search, Clear } from "@material-ui/icons";

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
      title: "Enabled",
      field: "enabled",
      render: rowData => <Checkbox checked={rowData.enabled} />,
      cellStyle: tableStyles.enabled
    },
    {
      align: "left",
      title: "Req name/id, Hit ID",
      field: "name",
      cellStyle: tableStyles.name
    },
    {
      align: "left",
      title: "Link",
      field: "link",
      cellStyle: tableStyles.link
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
