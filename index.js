// is active boolean flag to config so it can only change if reset was pressed
// add start timer to podoro time
// implement pause button
//add sound
//add progress bar

let isReset = true;
let pomodoroTime = 1;
let shortBreakTime = 3;
let longBreakTime = 1;
let currentIndex = 0;
let intervalId;
var audio = new Audio("sounds/beep.mp3");
const timerNames = [
  "Pomodoro 1",
  "Short Break 1",
  "Pomodoro 2",
  "Short Break 2",
  "Pomodoro 3",
  "Short break 3",
  "Pomodoro 4",
  "Long Break",
];
let timerCounts = [
  pomodoroTime,
  shortBreakTime,
  pomodoroTime,
  shortBreakTime,
  pomodoroTime,
  shortBreakTime,
  pomodoroTime,
  longBreakTime,
];

//progress bar

//timer

function startCountdown(timeArray) {
  let timeArrayLocal = timeArray;
  updateMainTimer(timeArray[currentIndex]);
  intervalId = setInterval(function () {
    timeArray[currentIndex]--;
    if (timeArray[currentIndex] <= 0) {
      clearInterval(intervalId);
      currentIndex++;
      document.querySelector(".timer__title").innerText =
        timerNames[currentIndex];
      if (currentIndex >= timeArray.length) {
        document.querySelector(".timer__title").innerText = "Timer completed!";
        document.querySelector(".timer__countdown").innerText = "0:00";
        document.querySelector(".controls__btn--start").innerText = "Start";
        audio.play();
        clearInterval(intervalId);
        return;
      }
      startCountdown(timeArray);
    }
    updateMainTimer(timeArray[currentIndex]);
  }, 1000);
}

//control buttons

function controlTimer() {
  isReset = false;
  resetTimerArray();
  if (document.querySelector(".controls__btn--start").innerText === "Start") {
    document.querySelector(".controls__btn--start").innerText = "Pause";
    startCountdown(timerCounts);
  } else {
    document.querySelector(".controls__btn--start").innerText = "Start";
    clearInterval(intervalId);
  }
}

function resetEverything() {
  clearInterval(intervalId);
  document.querySelector(".controls__btn--start").innerText = "Start";
  isReset = true;
  currentIndex = 0;
  document.querySelector(".timer__title").innerText = timerNames[currentIndex];
  resetTimerArray();
  updatePomodoroTimer();
  updateShortBreakTimer();
  updateLongBreakTimer();
  updateMainTimer(pomodoroTime);
  alert("Everything is reset");
}

//config

function secondsToDisplay(p) {
  const minutes = Math.floor(p / 60)
    .toString()
    .padStart(1, "0");
  const seconds = (p % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

//  timer display updates

function updateMainTimer(p) {
  if (p <= 0) {
    document.querySelector(".timer__countdown").innerText =
      "Timer sequence over";
    return;
  }
  document.querySelector(".timer__countdown").innerText = secondsToDisplay(p);
}

function updateMainTimerInitial() {
  document.querySelector(".timer__countdown").innerText =
    secondsToDisplay(pomodoroTime);
}

function updatePomodoroTimer() {
  document.querySelector(".settings__box__time--pomodoro").innerText =
    secondsToDisplay(pomodoroTime);
}

function updateShortBreakTimer() {
  document.querySelector(".settings__box__time--short-break").innerText =
    secondsToDisplay(shortBreakTime);
}

function updateLongBreakTimer() {
  document.querySelector(".settings__box__time--long-break").innerText =
    secondsToDisplay(longBreakTime);
}

// variable updates

function resetTimerArray() {
  timerCounts = [
    pomodoroTime,
    shortBreakTime,
    pomodoroTime,
    shortBreakTime,
    pomodoroTime,
    shortBreakTime,
    pomodoroTime,
    longBreakTime,
  ];
}

function addTimeOneMinute(p) {
  if (isReset) {
    return (p += 60);
  } else {
    alert("Please reset first!");
    return p;
  }
}

function subtractTimeOneMinute(p) {
  if (isReset) {
    return (p -= 60);
  } else {
    alert("Please reset first!");
    return p;
  }
}

function subtractPomodoroTime() {
  pomodoroTime = subtractTimeOneMinute(pomodoroTime);
  updatePomodoroTimer();
  updateMainTimerInitial();
}

function addPomodoroTime() {
  pomodoroTime = addTimeOneMinute(pomodoroTime);
  updatePomodoroTimer();
  updateMainTimerInitial();
}

function subtractShortBreakTime() {
  shortBreakTime = subtractTimeOneMinute(shortBreakTime);
  updateShortBreakTimer();
}

function addShortBreakTime() {
  shortBreakTime = addTimeOneMinute(shortBreakTime);
  updateShortBreakTimer();
}

function subtractLongBreakTime() {
  longBreakTime = subtractTimeOneMinute(longBreakTime);
  updateLongBreakTimer();
}
function addLongBreakTime() {
  longBreakTime = addTimeOneMinute(longBreakTime);
  updateLongBreakTimer();
}
