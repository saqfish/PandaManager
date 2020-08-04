import { accept } from "../util";
import PMAudio from "../audio/audios";
const { loadAudio, setSound, sound } = PMAudio();

let timeout = null;
let innerTimeout = null;
let clients = [];
let cycling = false;

let pandas;
let delays;

const sleep = ms =>
  new Promise(resolve => {
    innerTimeout = setTimeout(resolve, ms);
  });

const clearSelected = () => {
  for (let panda of pandas) panda.selected = false;
};

const checkEnabled = () => {
  for (let panda of pandas) if (panda.enabled) return true;
  return false;
};

const send = id => {
  for (let client of clients) {
    if (client != null) {
      try {
        client.postMessage({ cycling, pandas, id });
      } catch (error) {
        clients = clients.filter(cClient => cClient != client);
      }
    }
  }
};

const cycler = {
  load: async beep => {
    loadAudio(beep);
  },
  cycling: () => cycling,
  setCycling: value => (cycling = value),
  setPandas: value => (pandas = value),
  setDelays: value => (delays = value),
  setAudio: value => {
    setSound(typeof value == "undefined" ? 0 : value);
  },
  updatePandas: value => {
    pandas = value;
    send(null);
  },
  addClient: value => clients.push(value),
  clients: () => clients,
  removeClient: value => {
    clients = clients.filter(client => client != value);
  },
  toggle: () => (cycling = !cycling)
};

const acceptPanda = id => {
  accept(pandas[id].link)
    .then(res => {
      pandas[id].name = res.project.requester_name;
      pandas[id].description = res.project.title;
      pandas[id].accepted = pandas[id].accepted + 1;

      if (pandas[id].alarm) {
        sound().play();
        pandas[id].alarm = false;
      }
    })
    .catch(res => console.log(res));
};

const cycle = data => {
  const { single } = data;
  console.log("cycle");

  return new Promise(async resolve => {
    clearTimeout(timeout);
    timeout = null;
    clearSelected();

    resolve(cycling);

    if (pandas.length > 0 && checkEnabled()) {
      if (cycling) {
        if (single) {
          acceptPanda(data.id);
          pandas[data.id].selected = true;
          send(data.id);
          await sleep(delays.cycle);
        } else {
          for (let i in pandas) {
            if (pandas[i].enabled) {
              acceptPanda(i);
              pandas[i].selected = true;
              send(null);
              await sleep(delays.cycle);
              pandas[i].selected = false;
            }
          }
        }
        cycle(data);
      } else {
        if (innerTimeout) clearTimeout(innerTimeout);
        clearSelected();
        send(null);
      }
    } else {
      await sleep(delays.cycle);
      cycle(data);
    }
  });
};

export { cycler, cycle };
