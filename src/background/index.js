/* eslint-disable no-undef */

import PMSettings from "./settings";

import { open } from "miscUtils";
import { messages } from "./constants";

const {
  loadSettings,
  saveSettings,
  settingsValues,
  setSettingsValues
} = PMSettings();

import { cycler, cycle } from "./cycler/cycler";

let docsData = { page: 0 };

const dispatcher = (value, sender) => {
  const from = sender.url.match(/^chrome-extension:\/\/.{32}\/(.*).html/);
  const fromOptions = from != null && from[1] == "options";
  return new Promise((resolve, reject) => {
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
          data: settingsValues(),
          cycling: cycler.cycling()
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
      [messages.addPanda]: data => {
        settingsValues().pandas.push(data);
        cycler.updatePandas(settingsValues().pandas);
        saveSettings();
        resolve(true);
      },
      [messages.cycle]: data => {
        cycler.setPandas(settingsValues().pandas);
        cycler.setDelays(settingsValues().delays);
        cycler.setAudio(settingsValues().beep);
        cycler.toggle();
        cycle(data)
          .then(cycling => {
            resolve(cycling);
          })
          .catch(() => reject());
      },
      [messages.openDocs]: data => {
        docsData.page = data;
        open(settingsValues().inTab, "docs.html");
        resolve(true);
      },
      [messages.setSettingsValues]: data => {
        const checkedData = !fromOptions
          ? { ...settingsValues(), ...data }
          : { ...settingsValues(), ...data,
            pandas: settingsValues().pandas,
            delays: settingsValues().delays
          };

        setSettingsValues(checkedData);

        saveSettings();
        cycler.setPandas(settingsValues().pandas);
        cycler.setDelays(settingsValues().delays);
        cycler.setAudio(settingsValues().beep);
        resolve(settingsValues());
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
            filename: "pm_backup.json"
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
  await cycler.load(settingsValues().beep);

  browser.runtime.onConnect.addListener(port => {
    cycler.addClient(port);
    port.onDisconnect.addListener(client => {
      cycler.removeClient(client);
    });
  });

  browser.runtime.onMessage.addListener(
    (message, sender) =>
      new Promise(async (resolve, reject) => {
        await dispatcher(message, sender)
          .then(res => resolve(res))
          .catch(res => reject(res));
      })
  );
}

background();
