const messages = {
  initMain: 0,
  initPopup: 1,
  initOptions: 2,
  addPanda: 3,
  cycle: 4,
  setSettingsValues: 5,
  openPage: 6,
  backup: 7,
  initDocs: 8,
  openDocs: 9
};

const keys = {
  settings: "pm_settings"
};

const defaults = {
  settings: {
    pandas: [],
    beep: 1,
    customAudio: null,
    delays: {
      cycle: 1000
    },
    inTab: true,
    theme: {
      palette: {
        type: "dark"
      }
    }
  }
};
export { messages, keys, defaults };
