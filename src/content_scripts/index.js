import { sendToBackground } from "miscUtils";
import { messages } from "constants";

window.addEventListener("load", () => {
  setupOnSite[checkURL(window.location.href)]();
});

const sites = [
  "https://worker.mturk.com/",
  "https://worker.mturk.com/?hit_forker"
];

const checkURL = url => (sites.includes(url) ? url : "other");

const setupOnSite = {
  ["https://worker.mturk.com/"]: () => {
    const mainContent = document.getElementById("MainContent");
    const table = mainContent.querySelectorAll("[data-react-props]")[2];
    const cells = table.getElementsByTagName("li");
    const dataset = table.dataset;
    const props = dataset.reactProps;
    const data = JSON.parse(props);
    const hits = data.bodyData;

    for (let i = 1; i < cells.length; i++) {
      const cell = cells[i];
      let pButton = pandaButton(hits[i - 1]);
      let oButton = pandaOnceButton(hits[i - 1]);
      addToCell(pButton, cell);
      addToCell(oButton, cell);
    }
  },
  ["https://worker.mturk.com/?hit_forker"]: () => {
    window.addEventListener("PM_EVENT", e => {
      sendToBackground(messages.addPanda, e.detail)
        .then(res => {
          console.log(res);
        })
        .catch(() => alert("Couldn't send to Panda Manager!. Try refreshing."));
    });
  },
  ["other"]: () => null
};

const pandaOnceButton = hit => {
  const button = document.createElement("button");
  button.textContent = "P";
  button.style.backgroundColor = "lawngreen";
  button.style.maxWidth = "26px";
  button.onclick = () => {
    const item = {
      name: hit.requester_name,
      link: `https://worker.mturk.com${hit.accept_project_task_url}`,
      accepted: 0,
      description: hit.description,
      alarm: true,
      enabled: true
    };
    sendToBackground(messages.addPanda, item)
      .then(res => {
        console.log(res);
      })
      .catch(() => alert("Couldn't send to Panda Manager!. Try refreshing."));
  };
  return button;
};

const pandaButton = hit => {
  const button = document.createElement("button");
  button.textContent = "P";
  button.style.backgroundColor = "indianred";
  button.style.color = "white";
  button.style.maxWidth = "26px";
  button.onclick = () => {
    const item = {
      name: hit.requester_name,
      link: `https://worker.mturk.com${hit.accept_project_task_url}`,
      accepted: 0,
      description: hit.description,
      alarm: true,
      enabled: false
    };
    sendToBackground(messages.addPanda, item)
      .then(res => {
        console.log(res);
      })
      .catch(() => alert("Couldn't send to Panda Manager!. Try refreshing."));
  };
  return button;
};

const addToCell = (newElement, cell) => {
  const element = cell.firstChild.firstChild;
  const parent = element.parentNode;
  parent.insertBefore(newElement, element);
};
