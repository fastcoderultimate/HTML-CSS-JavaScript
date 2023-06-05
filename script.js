const clock = document.querySelector(".clock");
const lines = clock.querySelector(".lines");
const secondsIndicator = clock.querySelector(".seconds_indicator");
const minutesIndicator = clock.querySelector(".minutes_indicator");
const hoursIndicator = clock.querySelector(".hours_indicator");

let hours = "";
let minutes = "";

for (var i = 1; i <= 12; i++) {
  hours += `<div class="hour" style="--i: ${i}"><span>${i}</span></div>`;
}
for (var i = 1; i <= 60; i++) {
  if (i % 5 !== 0) {
    minutes += `<div class="minute" style="--i: ${i}"><span></span></div>`;
  }
}
lines.innerHTML = hours + minutes;

const setTime = () => {
  const date = new Date();
  // 360 / 60 = 6
  const secondRotate = date.getSeconds() * 6;
  const minuteRotate = date.getMinutes() * 6 + secondRotate / 60;
  // 360 / 12 = 30
  const hourRotate = date.getHours() * 30 + minuteRotate / 12;

  secondsIndicator.setAttribute("style", `--rotate: ${secondRotate}deg`);
  minutesIndicator.setAttribute("style", `--rotate: ${minuteRotate}deg`);
  hoursIndicator.setAttribute("style", `--rotate: ${hourRotate}deg`);
};
setTime();
setInterval(() => {
  setTime();
}, 1000);
