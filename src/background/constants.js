const messages = {
  initMain: 0,
  initPopup: 1,
  initOptions: 2,
  cycle: 3,
  setSettingsValues: 4,
  openPage: 5,
  backup: 6,
  initDocs: 7,
  openDocs: 8
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
