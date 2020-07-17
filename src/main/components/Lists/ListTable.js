import React, { useEffect, useRef, useState } from "react";

import { Alert } from "@material-ui/lab";
import MaterialTable, { MTableBody, MTableToolbar } from "material-table";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";
import { checkList } from "mainUtils";

import ListsAppBar from "./ListsAppBar";
import PandaCard from "./PandaCard";

import {
  Add,
  Check,
  Search,
  Clear,
  Edit,
  Delete,
  Save,
  Cancel,
  List,
  ListAlt
} from "@material-ui/icons";

import { containerStyle, tableStyles } from "./styles";

const ListTable = props => {
  const [bottomBarVisible, setBottomBarVisible] = useState(false);
  const [list, setList] = useState(props.data.pandas);
  const [rowDisplay, setRowDisplay] = useState(false);
  const loadedRef = useRef(false);

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
    Edit,
    Delete,
    Save,
    Cancel
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
            onClick: () => setRowDisplay(!rowDisplay)
          }
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const isListed = checkList(newData.name, list);
              setTimeout(() => {
                if (!isListed) {
                  setList(prev => [
                    ...prev,
                    {
                      name: newData.name,
                      metadata: newData.metadata,
                      tableData: { id: list.length }
                    }
                  ]);
                } else reject();
                resolve();
              }, 100);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                setList(prev =>
                  prev.map((value, index) =>
                    index == oldData.tableData.id
                      ? { name: newData.name, tableData: { id: oldData.tableData.id } } : value
                  )
                );
                resolve();
              }, 100);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                setList(prev => prev.filter(value => value != oldData));
                resolve();
              }, 100);
            })
        }}
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
    </div>
  );
};

export default ListTable;
