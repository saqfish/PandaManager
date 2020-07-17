import React, { useEffect, useRef, useState } from "react";

import { Alert } from "@material-ui/lab";
import Dialog from "@material-ui/core/Dialog";

import MaterialTable, { MTableBody, MTableToolbar } from "material-table";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";
import ListsAppBar from "./ListsAppBar";
import PandaCard from "./PandaCard";
import MessageDialog from "./MessageDialog";

import {
  Add,
  Check,
  Search,
  Clear,
  List,
  ListAlt
} from "@material-ui/icons";

import { containerStyle, tableStyles } from "./styles";

const ListTable = props => {
  const [bottomBarVisible, setBottomBarVisible] = useState(true);
  const [dialog, setDialog] = useState({ open: false, msg: null });
  const [list, setList] = useState(props.data.pandas);
  const [rowDisplay, setRowDisplay] = useState(false);
  // const addRef = useRef(null);
  const loadedRef = useRef(false);

  const onDialogClose = () => setDialog({ open: false, msg: null });

  const sendList = list =>
    sendToBackground(messages.setSettingsValues, { pandas: list });

  const {
    style,
    headerStyle,
    cardContainerStyle,
    name,
    metadata
  } = tableStyles;

  const tableIcons = {
    Add,
    Check,
    Clear,
    Search,
    ResetSearch: Clear,
  };

  useEffect(() => {
    if (loadedRef.current) {
      sendList(list);
    } else {
      loadedRef.current = true;
    }
  }, [list]);

  return (
    <div style={containerStyle}>
      <ListsAppBar
        data={{ list, title: "Pandas", bottomBarVisible }}
        func={{ sendList, setBottomBarVisible }}
      />
      <MaterialTable
        icons={tableIcons}
        title="Pandas"
        data={list}
        style={style}
        options={{
          showTitle: false,
          headerStyle: headerStyle,
          detailPanelType: "single",
          padding: "dense",
          paging: false,
          showFirstLastPageButtons: false,
          addRowPosition: "first"
        }}
        localization={{
          body: { emptyDataSourceMessage: "" },
          pagination: {
            labelDisplayedRows: ""
          }
        }}
        columns={[
          {
            title: "Req name/id, Hit ID",
            field: "name",
            cellStyle: name
          },
          {
            title: "Metadata",
            field: "metadata",
            cellStyle: metadata,
            render: rowData =>
              typeof rowData.data != "undefined"
                ? `${rowData.data.requester_name} - ${rowData.data.title}`
                : rowData.metadata
          }
        ]}
        actions={[
          {
            icon: rowDisplay ? List : ListAlt,
            isFreeAction: true,
            type: 0,
            onClick: () => setRowDisplay(!rowDisplay)
          },
          {
            icon: Add,
            type: 1,
            isFreeAction: true,
            onClick: () => setDialog({ open: true, msg: "blah" })
          }
        ]}
        components={{
          Toolbar: props =>
            bottomBarVisible ? <MTableToolbar {...props} /> : null,
          Body: props => {
            console.log(props.renderData);
            const isEditing = props.hasAnyEditingRow;
            const cards = (
              <div style={cardContainerStyle}>
                {props.renderData.map(data => (
                  <PandaCard data={data} />
                ))}
              </div>
            );
            const tableBody = rowDisplay ? <MTableBody {...props} /> : cards;
            const emptyListAlert = (
              <Alert severity="info">
                Looks like your panda list is empty. Try adding some items.
              </Alert>
            );

            const isValid = typeof list != "undefined" && list != null;

            const isListEmpty = isValid && list.length < 1;

            return isListEmpty && !isEditing ? emptyListAlert : tableBody;
          }
        }}
      />
      <Dialog open={dialog.open} onClose={onDialogClose}>
        <MessageDialog data={dialog.msg} list={{list,setList}} func={onDialogClose} />
      </Dialog>
    </div>
  );
};

export default ListTable;
