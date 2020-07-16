const messages = {
  initMain: 0,
  initPopup: 1,
  initOptions: 2,
  setSettingsValues: 3,
  openPage: 4,
  backup: 5,
  initDocs: 6,
  openDocs: 7
};

const keys = {
  settings: "pm_settings"
};

const defaults = {
  settings: {
    pandas: [],
    beep: 1,
    inTab: false,
    theme: {
      palette: {
        type: "dark"
      }
    }
  }
};
export { messages, keys, defaults };
