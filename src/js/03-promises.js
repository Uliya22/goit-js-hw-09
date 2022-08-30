import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayEl  = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onFormSubmit);

function  onFormSubmit(evt) {
  evt.preventDefault();
  let delay = +delayEl.value;
  const step = +stepEl.value;
  const amount = +amountEl.value;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay).then(Notify.success).catch(Notify.failure);
    delay += step;
  }
  form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }  
    }, delay);
  });
}