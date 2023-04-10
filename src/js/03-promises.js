const form = document.querySelector(".form");

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    let time = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valueAmount = Number(form.elements.amount.value);
  const valueStep = Number(form.elements.step.value);
  const valueDelay = Number(form.elements.delay.value);

  for (let i = 1; i <= valueAmount; i += 1) {
    let time = valueDelay + valueStep * (i - 1);
    createPromise(i, time)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay} ms`);
      });
  }
});
