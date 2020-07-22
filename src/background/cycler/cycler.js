let timeout = null;
let innerTimeout = null;
let client = null;
let cycling = false;

const sleep = ms =>
  new Promise(resolve => {
    innerTimeout = setTimeout(resolve, ms);
  });

const clearSelected = pandas => {
  for (let panda of pandas) panda.selected = false;
};

const send = (pandas, client) => {
  if (client != null) client.postMessage(pandas);
};

const cycler = {
  cycling: () => cycling,
  setCycling: value => (cycling = value),
  setClient: value => (client = value),
  toggle: () => (cycling = !cycling)
};

const cycle = values => {
  const { pandas, delays } = values;
  send(pandas, client);

  return new Promise(async (resolve, reject) => {
    clearTimeout(timeout);
    timeout = null;

    if (pandas.length) {
      resolve(cycling);

      if (cycling) {
        console.log(`cycle ${timeout}`);
        for (let panda of pandas) {
          if (panda.enabled) {
            panda.selected = true;
            send(pandas, client);
            await sleep(delays.cycle);
            panda.selected = false;
          }
        }
        cycle(values);
      } else {
        if (innerTimeout) clearTimeout(innerTimeout);
        clearSelected(pandas);
        send(pandas, client);
      }
    } else reject();
  });
};

export { cycler, cycle };
