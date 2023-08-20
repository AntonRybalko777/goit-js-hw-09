import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = form.elements.delay;
const stepInput = form.elements.step;
const amountInput = form.elements.amount;

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  const amount = Number(amountInput.value);
  const delay = Number(delayInput.value);

  for (let i = 0; i < amount; i++) {
    let step = Number(stepInput.value);
    currentDelay = delay + step * i;
    createPromise(i + 1, currentDelay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      return Notiflix.Notify.success(
        `✅ Fulfilled promise ${position} in ${delay}ms`
      );
    })
    .catch(({ position, delay }) => {
      return Notiflix.Notify.failure(
        `❌ Rejected promise ${position} in ${delay}ms`
      );
    });
}
