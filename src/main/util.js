import { colors } from "./constants";

const getRatingColor = (rating, max, dark) => {
  const percent = (rating / max) * 100;

  const palette = dark ? colors.dark : colors.light;
  const { green, yellow, darkorange, red, bg } = palette;

  let color = bg;
  color = percent > 0 ? green : color;
  color = percent > 30 ? yellow : color;
  color = percent > 60 ? darkorange : color;
  color = percent > 80 ? red : color;

  return `#${color}`;
};

const checkList = (name, list) =>
  typeof list.find(value => value.name == name) != "undefined";

export { getRatingColor, checkList };
