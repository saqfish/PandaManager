import { accept } from "../util";

let timeout = null;
let innerTimeout = null;
let clients = [];
let cycling = false;

const sleep = ms =>
  new Promise(resolve => {
    innerTimeout = setTimeout(resolve, ms);
  });

const clearSelected = pandas => {
  for (let panda of pandas) panda.selected = false;
};

const checkEnabled = pandas => {
  for (let panda of pandas) if (panda.enabled) return true;
  return false;
};

const send = (pandas, client) => {
  for (client of clients) {
    if (client != null) {
      try {
        client.postMessage({ cycling, pandas });
      } catch (error) {
        clients = clients.filter(cClient => cClient != client);
      }
    }
  }
};

const cycler = {
  cycling: () => cycling,
  setCycling: value => (cycling = value),
  addClient: value => clients.push(value),
  clients: () => clients,
  removeClient: value => {
    clients = clients.filter(client => client != value);
  },
  toggle: pandas => {
    if (pandas.length > 0 && checkEnabled(pandas)) cycling = !cycling;
  }
};

const acceptPanda = panda => {
  panda.selected = true;
  accept(panda.link)
    .then(res => {
      panda.name = res.project.requester_name;
      panda.description = res.project.title;
      panda.accepted++;
    })
    .catch(res => console.log(res));
};

const cycle = (values, data) => {
  const { pandas, delays } = values;
  const { single } = data;

  clearSelected(pandas);

  send(pandas, clients);

  return new Promise(async (resolve, reject) => {
    clearTimeout(timeout);
    timeout = null;

    if (pandas.length > 0) {
      resolve(cycling);

      if (cycling) {
        if (single) {
          let panda = pandas[data.id];
          acceptPanda(panda);
          send(pandas, clients);
          await sleep(delays.cycle);
          panda.selected = false;
        } else {
          for (let panda of pandas) {
            if (panda.enabled) {
              panda.selected = true;
              acceptPanda(panda);
              send(pandas, clients);
              await sleep(delays.cycle);
              panda.selected = false;
            }
          }
        }
        cycle(values, data);
      } else {
        if (innerTimeout) clearTimeout(innerTimeout);
        clearSelected(pandas);
        send(pandas, clients);
      }
    } else reject();
  });
};

export { cycler, cycle };
