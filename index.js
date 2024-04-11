// is active boolean flag to config so it can only change if reset was pressed
// add start timer to podoro time
// implement pause button
//add sound
//add progress bar

let isReset = true;
let pomodoroTime = 1500;
let shortBreakTime = 300;
let longBreakTime = 1500;
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
let timerCountConstant = [
  pomodoroTime,
  shortBreakTime,
  pomodoroTime,
  shortBreakTime,
  pomodoroTime,
  shortBreakTime,
  pomodoroTime,
  longBreakTime,
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
let circle = document.querySelector(".circle_loader");
let circumference = 2 * Math.PI * circle.r.baseVal.value;
circle.style.strokeDasharray = `${circumference} 1000`;

function setProgress(percent) {
  circle.style.strokeDashoffset = circumference - circumference * (1 - percent);
  // console.log("percent= " + percent);
  // console.log("circumference= " + circumference);
  // console.log("set progress % " + circumference * (1 - percent));
}

// full progress so its hidden by default
setProgress(11500);

//timer

function startCountdown(timeArray) {
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
        setProgress(500);
        audio.play();
        clearInterval(intervalId);
        return;
      }
      startCountdown(timeArray);
    }
    updateMainTimer(timeArray[currentIndex]);
    // console.log(timeArray[currentIndex] + " timearray");
    // console.log(timerCountConstant[currentIndex] + " timearcount");
    // console.log(
    //   (1 - timerCountConstant[currentIndex] / timeArray[currentIndex]) * 100 +
    //     " % of time passed"
    // );
    setProgress(timeArray[currentIndex] / timerCountConstant[currentIndex]);
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
  setProgress(11500);
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
  timerCountConstant = [
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
