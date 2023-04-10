const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const backgroundColor = document.querySelector("body");

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.setAttribute("disabled", true);

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    backgroundColor.style.backgroundColor = randomColor;
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
});
