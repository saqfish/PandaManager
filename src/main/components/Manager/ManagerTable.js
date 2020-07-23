import React, { useState, useContext } from "react";

import { Alert } from "@material-ui/lab";
import Dialog from "@material-ui/core/Dialog";

import MaterialTable, { MTableBody, MTableToolbar } from "material-table";

import ManagerAppBar from "./ManagerAppBar/ManagerAppBar";
import PandaCard from "./PandaCard/PandaCard";
import AddDialog from "./Dialogs/AddDialog";
import DetailDialog from "./Dialogs/DetailDialog";
import ManagerToolbar from "./ManagerToolbar/ManagerToolbar";

import { List, ListAlt } from "@material-ui/icons";

import { managerContext } from "./context";
import { containerStyle, tableStyles } from "./styles";
import { table } from "./table";

const ManagerTable = () => {
  const [bottomBarVisible, setBottomBarVisible] = useState(false);
  const [rowDisplay, setRowDisplay] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: null });

  const onDialogClose = () =>
    setDialog({ open: false, type: null, data: null });
  const showDetails = item => setDialog({ open: true, type: 2, data: item });

  const { cycling, list, setCycling } = useContext(managerContext);

  return (
    <div style={containerStyle}>
      <ManagerAppBar
        data={{
          list,
          title: "Panda Manager",
          cycling,
          bottomBarVisible
        }}
        func={{ setDialog, setCycling, setBottomBarVisible }}
      />
      <MaterialTable
        data={list}
        {...table}
        actions={[
          {
            icon: rowDisplay ? List : ListAlt,
            isFreeAction: true,
            type: 0,
            onClick: () => setRowDisplay(!rowDisplay)
          }
        ]}
        components={{
          Toolbar: props =>
            bottomBarVisible ? (
              <div style={tableStyles.toolbarStyle}>
                <ManagerToolbar />
                <MTableToolbar {...props} />
              </div>
            ) : null,
          Body: props => {
            const isEditing = props.hasAnyEditingRow;
            const cards = (
              <div style={tableStyles.cardContainerStyle}>
                {props.renderData.map(data => (
                  <PandaCard data={data} func={showDetails} />
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
        {dialog.type == 1 ? <AddDialog close={onDialogClose} /> : null}
        {dialog.type == 2 ? (
          <DetailDialog data={dialog.data} close={onDialogClose} />
        ) : null}
      </Dialog>
    </div>
  );
};

export default ManagerTable;
