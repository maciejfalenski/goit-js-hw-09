// Opisany w dokumentacji
import flatpickr from "flatpickr";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button[data-start]");
const timerItem = document.querySelector(".timer");
const timerDays = document.querySelector("span[data-days]");
const timerHours = document.querySelector("span[data-hours]");
const timerMinutes = document.querySelector("span[data-minutes]");
const timerSeconds = document.querySelector("span[data-seconds]");

timerItem.style.display = "flex";
timerItem.style.justifyContent = "space-evenly";
timerItem.style.width = "24%";
timerItem.style.marginLeft = "-10px";

let timer = null;

btnStart.setAttribute("disabled", true);

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDateMs = selectedDates[0].getTime();
    let actuallDateMs = new Date().getTime();

    if (selectedDateMs < actuallDateMs) {
      window.alert("Please choose a date in the future");
      btnStart.disabled = true;
    } else {
      //   console.log(selectedDates[0]);
      btnStart.disabled = false;
      let ms = selectedDateMs - actuallDateMs;

      const convertMs = () => {
        const addLeadingZero = (value) => value.toString().padStart(2, "0");
        timer = setInterval(() => {
          // Number of milliseconds per unit of time
          const second = 1000;
          const minute = second * 60;
          const hour = minute * 60;
          const day = hour * 24;

          // Remaining days
          const days = Math.floor(ms / day);
          // Remaining hours
          const hours = Math.floor((ms % day) / hour);
          // Remaining minutes
          const minutes = Math.floor(((ms % day) % hour) / minute);
          // Remaining seconds
          const seconds = Math.floor((((ms % day) % hour) % minute) / second);

          ms -= 1000;

          timerDays.textContent = addLeadingZero(days);
          timerHours.textContent = addLeadingZero(hours);
          timerMinutes.textContent = addLeadingZero(minutes);
          timerSeconds.textContent = addLeadingZero(seconds);

          if (ms < 1000) {
            clearInterval(timer);
            timerSeconds.textContent = 0;
          }
        }, 1000);
      };
      btnStart.addEventListener("click", convertMs);
    }
  },
});
