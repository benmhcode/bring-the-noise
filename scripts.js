const volumeInput = document.createElement("INPUT");
const volumeLabel = document.createElement("LABEL");
const timerInput = document.createElement("SELECT");
const timerLabel = document.createElement("LABEL");
const timerStart = document.createElement("BUTTON");

volumeInput.setAttribute("type", "range");
volumeInput.setAttribute("label", "Volume");
volumeInput.setAttribute("min", -60);
volumeInput.setAttribute("max", 0);
volumeInput.setAttribute("value", -25);

volumeLabel.innerText = "Volume";
timerLabel.innerText = "Set Timer";
timerStart.innerText = "Start Timer";

const timerOptions = [
  {
    value: 5,
    text: "5 seconds",
  },
  {
    value: 10,
    text: "10 seconds",
  },
  {
    value: 15,
    text: "15 seconds",
  },
  {
    value: 20,
    text: "20 seconds",
  },
  {
    value: 25,
    text: "25 seconds",
  },
  {
    value: 30,
    text: "30 seconds",
  },
];

// let convertedVolume = volumeInput.value;

// const vol = new Tone.Volume(convertedVolume).toDestination();

const noiseW = new Tone.Noise("white").toDestination();
const noiseP = new Tone.Noise("pink").toDestination();
const noiseB = new Tone.Noise("brown").toDestination();

const container = document.querySelector(".container");
const whiteNoise = document.createElement("BUTTON");
const pinkNoise = document.createElement("BUTTON");
const brownNoise = document.createElement("BUTTON");

let whiteNoiseValue = false;
let pinkNoiseValue = false;
let brownNoiseValue = false;

whiteNoise.innerText = "White Noise";
pinkNoise.innerText = "Pink Noise";
brownNoise.innerText = "Brown Noise";

function setVolume() {
  noiseW.volume.value = volumeInput.value;
  noiseP.volume.value = volumeInput.value;
  noiseB.volume.value = volumeInput.value;
}

function whiteNoiseStart() {
  noiseW.start();
  whiteNoiseValue = true;
  whiteNoise.innerText = "Turn off";
}

function whiteNoiseStop() {
  noiseW.stop();
  whiteNoiseValue = false;
  whiteNoise.innerText = "White Noise";
}

function pinkNoiseStart() {
  noiseP.start();
  pinkNoiseValue = true;
  pinkNoise.innerText = "Turn off";
}

function pinkNoiseStop() {
  noiseP.stop(0);
  pinkNoiseValue = false;
  pinkNoise.innerText = "Pink Noise";
}

function brownNoiseStart() {
  noiseB.start();
  brownNoiseValue = true;
  brownNoise.innerText = "Turn off";
}

function brownNoiseStop() {
  noiseB.stop();
  brownNoiseValue = false;
  brownNoise.innerText = "Brown Noise";
}

function pinkNoiseAudio() {
  whiteNoiseStop();
  brownNoiseStop();
  if (pinkNoiseValue) {
    pinkNoiseStop();
  } else {
    pinkNoiseStart();
  }
}

function whiteNoiseAudio() {
  pinkNoiseStop();
  brownNoiseStop();
  if (whiteNoiseValue) {
    whiteNoiseStop();
  } else {
    whiteNoiseStart();
  }
}

function brownNoiseAudio() {
  whiteNoiseStop();
  pinkNoiseStop();
  if (brownNoiseValue) {
    brownNoiseStop();
  } else {
    brownNoiseStart();
  }
}

function stopAll() {
  whiteNoiseStop();
  pinkNoiseStop();
  brownNoiseStop();
}

function timerEnds() {
  timerStart.removeEventListener("click", timerEnds);
  timerStart.addEventListener("click", timerCancelled);
  function timerCancelled() {
    timerStart.removeEventListener("click", timerCancelled);
    clearInterval(setTimer);
    resetTimer();
  }
  let time = timerInput.value;
  timerLabel.innerText = "Time remaining: " + time + " secs";
  timerStart.innerText = "Cancel timer";
  setTimer = setInterval(countdown, 1000);
  function countdown() {
    if (time !== 0) {
      time -= 1;
      timerLabel.innerText = "Time remaining: " + time + " secs";
    } else {
      stopAll();
      resetTimer();
    }
  }
  function resetTimer() {
    timerLabel.innerText = "Set Timer";
    timerStart.innerText = "Start Timer";
    timerStart.addEventListener("click", timerEnds);
  }
}

setVolume();

container.appendChild(whiteNoise);
container.appendChild(pinkNoise);
container.appendChild(brownNoise);
// container.appendChild(volumeLabel);
// container.appendChild(volumeInput);
container.appendChild(timerLabel);
container.appendChild(timerInput);
container.appendChild(timerStart);

const setTimerOptions = (timerOptions) => {
  timerOptions.forEach((opt) => {
    const option = document.createElement("OPTION");
    const text = document.createTextNode(opt.text);
    option.value = opt.value;
    option.appendChild(text);
    timerInput.appendChild(option);
  });
};

setTimerOptions(timerOptions);

whiteNoise.addEventListener("click", whiteNoiseAudio);
pinkNoise.addEventListener("click", pinkNoiseAudio);
brownNoise.addEventListener("click", brownNoiseAudio);
// volumeInput.addEventListener("click", setVolume);
// volumeInput.addEventListener(
//   "input",
//   (e) => {
//     let val = e.currentTarget.value;
//     volume.querySelector.value = val;
//     noiseW.Transport.volume = val;
//   },
//   false
// );
timerStart.addEventListener("click", timerEnds);
