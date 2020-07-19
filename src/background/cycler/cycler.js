let timeout = null;
let cycling = false;

const cycler = {
  cycling: () => cycling,
  setCycling: value => (cycling = value),
  toggle: () => (cycling = !cycling)
};

const cycle = () => {
  return new Promise(resolve => {

    clearTimeout(timeout);
    timeout = null;

    if (cycling)
      timeout = setTimeout(() => {
        console.log(`cycle ${timeout}`);
        cycle();
      }, 1000);

    resolve(cycling);
  });
};
export { cycler, cycle };
