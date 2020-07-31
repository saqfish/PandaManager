import { sendToBackground } from "miscUtils";
import { messages } from "constants";

window.addEventListener("load", () => {
  const mainContent = document.getElementById("MainContent");

  const table = mainContent.querySelectorAll("[data-react-props]")[2];

  const cells = table.getElementsByTagName("li");

  const dataset = table.dataset;

  const props = dataset.reactProps;

  const data = JSON.parse(props);

  const hits = data.bodyData;

  for (let i = 1; i < cells.length; i++) {
    const cell = cells[i];
    let pButton = pandaButton(hits[i-1]);
    let oButton = pandaOnceButton(hits[i-1]);
    addToCell(pButton, cell);
    addToCell(oButton, cell);
  }
});

const pandaOnceButton = hit => {
  const button = document.createElement("button");
  button.textContent = "P";
  button.style.backgroundColor = "lawngreen";
  button.style.maxWidth = "26px";
  button.onclick = () => {
    const item = {
      name: hit.requester_name,
      link: `https://worker.mturk.com${hit.project_tasks_url}`,
      accepted: 0,
      description: hit.description,
      single: false,
      enabled: true
    };
    sendToBackground(messages.addPanda, item).then(res => {
      console.log(res);
    });
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
      link: `https://worker.mturk.com${hit.project_tasks_url}`,
      accepted: 0,
      description: hit.description,
      single: false,
      enabled: false
    };
    sendToBackground(messages.addPanda, item).then(res => {
      console.log(res);
    });
  };
  return button;
};

const addToCell = (newElement, cell) => {
  const element = cell.firstChild.firstChild;
  const parent = element.parentNode;
  parent.insertBefore(newElement, element);
};
