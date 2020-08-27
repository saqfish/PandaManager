import b1 from "./data/1.mp3";
import b2 from "./data/2.mp3";
import b3 from "./data/3.mp3";
import b4 from "./data/4.mp3";

export default () => {
  let sound;
  let audios = [
    null,
    new Audio(b1),
    new Audio(b2),
    new Audio(b3),
    new Audio(b4)
  ];

  return {
    loadAudio: (value, custom) => {
      let newAudio = new Audio("data:audio/mp3;base64," + custom);
      audios.push(newAudio);
      audios.map((b, index) => {
        if (index != 0) sound = b;
      });
      sound = audios[value];
    },
    reloadAudio: (value, custom) => {
      let newAudio = new Audio("data:audio/mp3;base64," + custom);
      audios.pop();
      audios.push(newAudio);
      audios.map((b, index) => {
        if (index != 0) sound = b;
      });
      sound = audios[value];
    },
    setSound: value => {
      sound = audios[value];
    },
    sound: () => sound
  };
};
