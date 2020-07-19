/* eslint-disable no-undef */

import PMSettings from "./settings";
import PMAudio from "./audio/audios";

import { open } from "miscUtils";
import { messages } from "./constants";

const {
  loadSettings,
  saveSettings,
  settingsValues,
  setSettingsValues
} = PMSettings();

import { cycler, cycle } from "./cycler/cycler";

const { loadAudio, setSound, sound } = PMAudio(); // eslint-disable-line

let docsData = { page: 0 };

const dispatcher = value => {
  console.log(value);
  return new Promise(resolve => {
    const dispatch = {
      [messages.initMain]: () => {
        resolve({
          theme: settingsValues().theme,
          data: settingsValues(),
          cycling: cycler.cycling()
        });
      },
      [messages.initPopup]: () => {
        resolve({
          theme: settingsValues().theme,
          data: settingsValues()
        });
      },
      [messages.initOptions]: () => {
        resolve({
          theme: settingsValues().theme,
          values: settingsValues()
        });
      },
      [messages.initDocs]: () => {
        resolve({
          theme: settingsValues().theme,
          data: docsData
        });
      },
      [messages.cycle]: () => {
        cycler.toggle();
        cycle().then(cycling => {
          resolve(cycling);
        });
      },
      [messages.openDocs]: data => {
        docsData.page = data;
        open(settingsValues().inTab, "docs.html");
        resolve(true);
      },
      [messages.setSettingsValues]: data => {
        setSettingsValues({ ...settingsValues(), ...data });
        setSound(typeof data.beep == "undefined" ? 0 : data.beep);
        saveSettings();
        resolve(true);
      },
      [messages.openPage]: data => {
        open(settingsValues().inTab, data);
        resolve();
      },
      [messages.backup]: data => {
        const { load } = data;
        if (load) {
          const { backupData } = data;
          try {
            const tempRawData = atob(backupData);
            const tempData = JSON.parse(tempRawData);
            const check = tempData.hasOwnProperty("check");
            if (check) {
              setSettingsValues({ ...settingsValues(), ...tempData.settings });
              saveSettings();
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          var tempData = {
            check: 34032423,
            settings: settingsValues()
          };

          var url =
            "data:application/json;base64," +
            btoa(unescape(JSON.stringify(tempData)));
          browser.downloads.download({
            url: url,
            filename: "backup.json"
          });
        }
        resolve();
      }
    };
    dispatch[value.type](value.data);
  });
};

async function background() {
  await loadSettings();
  await loadAudio(settingsValues().beep);

  browser.runtime.onMessage.addListener(
    message =>
      new Promise(async (resolve, reject) => {
        await dispatcher(message)
          .then(res => resolve(res))
          .catch(res => reject(res));
      })
  );
}

background();
