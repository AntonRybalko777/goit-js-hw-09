import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { convertMs } from './common';

const elements = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    elements.startBtn.removeAttribute('disabled');
  },
};
elements.startBtn.addEventListener('click', handlerStart);

flatpickr('#datetime-picker', options);
function handlerStart(evt) {
  evt.target.setAttribute('disabled', 'disabled');
  const timer = setInterval(() => {
    const pickedDate = new Date(elements.input.value);
    let mlsLeft = pickedDate - new Date();
    elements.days.textContent = addLeadingZero(convertMs(mlsLeft).days);
    elements.hours.textContent = addLeadingZero(convertMs(mlsLeft).hours);
    elements.minutes.textContent = addLeadingZero(convertMs(mlsLeft).minutes);
    elements.seconds.textContent = addLeadingZero(convertMs(mlsLeft).seconds);
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
  }, new Date(elements.input.value) - new Date());
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
