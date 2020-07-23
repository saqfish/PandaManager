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

const send = (pandas, client) => {
  for (client of clients) {
    if (client != null) {
      try {
        client.postMessage(pandas);
      } catch (error) {
        console.log(error);
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
  toggle: () => (cycling = !cycling)
};

const cycle = values => {
  const { pandas, delays } = values;
  send(pandas, clients);

  return new Promise(async (resolve, reject) => {
    clearTimeout(timeout);
    timeout = null;

    if (pandas.length) {
      resolve(cycling);

      if (cycling) {
        for (let panda of pandas) {
          if (panda.enabled) {
            panda.selected = true;
            send(pandas, clients);
            await sleep(delays.cycle);
            panda.selected = false;
          }
        }
        cycle(values);
      } else {
        if (innerTimeout) clearTimeout(innerTimeout);
        clearSelected(pandas);
        send(pandas, clients);
      }
    } else reject();
  });
};

export { cycler, cycle };
