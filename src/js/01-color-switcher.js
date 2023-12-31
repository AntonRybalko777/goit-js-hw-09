import { getRandomHexColor } from './common';

const elements = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let colorSet = null;

elements.startBtn.addEventListener('click', handlerStart);
elements.stopBtn.addEventListener('click', handlerStop);

function handlerStart(evt) {
  evt.target.setAttribute('disabled', 'disabled');
  elements.stopBtn.removeAttribute('disabled');
  elements.body.style.backgroundColor = getRandomHexColor();
  colorSet = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handlerStop(evt) {
  elements.startBtn.removeAttribute('disabled');
  evt.target.setAttribute('disabled', 'disabled');
  clearInterval(colorSet);
}
