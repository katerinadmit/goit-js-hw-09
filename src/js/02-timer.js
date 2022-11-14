import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector(`#datetime-picker`),  
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
};
let intervalId = null;
refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStart)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
        console.log(selectedDates[0]);
    if (selectedDates[0] - currentDate > 0){
      refs.startBtn.disabled = false;
    }else{
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure(" ❌Please choose a date in the future");
      }     
     },
  };

const dataPickr = new flatpickr(refs.input, options);
 
function onStart() {
  const startDate = dataPickr.selectedDates[0];
  intervalId = setInterval(() => {
    const currentTime = new Date();    
    const countdownTime =   startDate - currentTime;
    refs.startBtn.disabled = true;

    if (countdownTime < 0) {
            clearInterval(intervalId);
      return
    }
   
    const { days, hours, minutes, seconds } = convertMs(countdownTime)
    console.log(`${days}:${hours}:${minutes}:${seconds}`)
  // console.log(currentTime)
  

 refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;

  }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days =addLeadingZero( Math.floor(ms / day));
  // Remaining hours
  const hours =addLeadingZero (Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero( Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value){
  return String(value).padStart(2,'0')
};






