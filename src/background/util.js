const accept = oldUrl => {
  return new Promise((resolve, reject) => {
    const url = oldUrl.replace("?ref=w_pl_prvw", ".json");
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    };
    fetch(url, options)
      .then(res => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then(res => {
        if (typeof res.project != "undefined") {
          resolve(res);
        } else reject(false);
      })
      .catch(error => {
        if (typeof error.status != "undefined") {
          if (error.status == 422) {
            reject(true);
          } else {
            reject(false);
          }
        }
        reject(false);
      });
  });
};

const getQueue = () => {
  return new Promise((resolve, reject) => {
    fetch("https://worker.mturk.com/tasks.json", { mode: "no-cors" })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(res => {
        let rewardsTotal = 0;
        res.tasks.forEach(task => {
          rewardsTotal += task.project.monetary_reward.amount_in_dollars;
        });
        resolve(rewardsTotal);
      })
      .catch(error => {
        console.log(error);
        reject(true);
      });
  });
};

export { accept, getQueue };
