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

const cycle = pandas => {
  return new Promise(async resolve => {
    clearTimeout(timeout);
    timeout = null;

    if (cycling) {
      console.log(`cycle ${timeout}`);
      for (let panda of pandas) {
        panda.selected = true;
        send(pandas, client);
        console.log(panda);
        await sleep(1000);
        panda.selected = false;
      }
      cycle(pandas);
    } else {
      if (innerTimeout) clearTimeout(innerTimeout);
      clearSelected(pandas);
      send(pandas, client);
    }
    resolve(cycling);
  });
};

export { cycler, cycle };
