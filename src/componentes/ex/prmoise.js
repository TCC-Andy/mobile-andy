const divDelayed = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (b == 0) reject('O valor de B não pode ser zero!');

    resolve(a / b);
  }, 2000);
});