import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const amount = Number(formData.get('amount'));
  const firstDelay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
 

  setTimeout(fulfillPromises, firstDelay, amount, step, firstDelay);
}

function fulfillPromises(amount, step, firstDelay) {
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay + firstDelay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay + firstDelay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}