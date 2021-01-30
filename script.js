var msg = new SpeechSynthesisUtterance();
var interval, p, timeelapsed;
var flag = "play";
const initialize = () => {
  let sec = 0;

  document.getElementById("timer").innerHTML = sec;

  document.getElementById("time-elapsed").innerHTML = sec;
  document.getElementById("reps-remaining").innerHTML = 80;
  flag = "play";
  document.getElementById("pause").innerHTML = "Pause";
};

window.onload = () => {
  initialize();
};
const speak = (text) => {
  msg.text = text;
  window.speechSynthesis.speak(msg);
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const totalTime = () => {
  let t;
  timeelapsed = setInterval(() => {
    if (flag == "play") {
      t = document.getElementById("time-elapsed").innerHTML;
      t++;
      document.getElementById("time-elapsed").innerHTML = t;
    }
  }, 1000);
};
async function doTheWork() {
  return new Promise((resolve) => {
    speak("Press");
    let time = 10;
    interval = setInterval(() => {
      if (flag == "play") {
        document.getElementById("timer").innerHTML = time;
        time--;
        if (time < 0) {
          speak("Release");
          clearInterval(interval);
          let reps = document.getElementById("reps-remaining").innerHTML;
          reps--;
          document.getElementById("reps-remaining").innerHTML = reps;

          resolve();
        }
      }
    }, 1000);
  });
}

const front = async (direction) => {
  document.getElementById("direction").innerHTML = direction;
  return new Promise(async (resolve) => {
    await sleep(3000);

    await doTheWork();
    resolve();
  });
};

document.getElementById("play").addEventListener("click", async () => {
  totalTime();

  speak("Place your hand on your fore head");
  for (let i = 0; i < 5; i++) {
    await front("FRONT");
  }
  await sleep(3000);
  speak("Place your hand on the back of your head");
  for (let i = 0; i < 5; i++) {
    await front("BACK");
  }
  await sleep(3000);
  speak("Place your hand on the right side of your head");
  for (let i = 0; i < 5; i++) {
    await front("RIGHT");
  }
  await sleep(3000);
  speak("Place your hand on the left side of your head");
  for (let i = 0; i < 5; i++) {
    await front("LEFT");
  }
  await sleep(3000);
});

document.getElementById("stop").addEventListener("click", () => {
  clearInterval(interval);
  clearInterval(timeelapsed);
  initialize();
  location.reload();
});

document.getElementById("pause").addEventListener("click", () => {
  if (flag == "pause") {
    flag = "play";
    document.getElementById("pause").innerHTML = "Pause";
  } else {
    flag = "pause";
    document.getElementById("pause").innerHTML = "Unpause";
  }
});
