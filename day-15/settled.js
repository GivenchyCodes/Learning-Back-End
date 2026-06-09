// // Promises run as microtasks

// // // // // // // A promise that is created here is pending until its work finishes.
// // // // // // const ticket = new Promise((resolve) => {
// // // // // //   setTimeout(() => resolve('coat'), 1000);
// // // // // // });

// // // // // // // Right after creation, the work has not finished, so it is still pending.
// // // // // // console.log(ticket); // Promise { <pending> }

// // // // // const a = Promise.resolve(1);
// // // // // const b = Promise.resolve(2);
// // // // // const c = Promise.resolve(3);

// // // // // Promise.all([a, b, c]).then((values) => {
// // // // //   console.log(values); // [1, 2, 3]
// // // // // });

// // // // //promise.race wait for the first promise to settle fulflled or reject and gives you that outcome
// // // // const ok = Promise.resolve('done');
// // // // const bad = Promise.reject(new Error('failed'));

// // // // Promise.allSettled([ok, bad]).then((results) => {
// // // //   results.forEach((result) => {
// // // //     if (result.status === 'fulfilled') {
// // // //       console.log('ok:', result.value); // "ok: done"
// // // //     } else {
// // // //       console.log('failed:', result.reason.message); // "failed: failed"
// // // //     }
// // // //   });
// // // // });

// // // // promise.any waits for the first promise to settle, fulfilled
// // // const slow = new Promise((resolve) => {
// // //   setTimeout(() => resolve('slow'), 500);
// // // });
// // // const fast = new Promise((resolve) => {
// // //   setTimeout(() => resolve('fast'), 100);
// // // });

// // // Promise.race([slow, fast]).then((winner) => {
// // //   console.log(winner); // "fast"
// // // });

// // // promise.any waits for the first promise to fullfil, ignoring rejections. it gives you that first success. if every promise reject, it rejects.
// // const slow = new Promise((resolve) => {
// //   setTimeout(() => resolve('slow'), 500);
// // });
// // const fast = new Promise((resolve) => {
// //   setTimeout(() => resolve('fast'), 100);
// // });

// // Promise.race([slow, fast]).then((winner) => {
// //   console.log(winner); // "fast"
// // });

// //allSettled just wants every result; race takes the first to finish; any takes the first to succed
// const fail = Promise.reject(new Error('no'));
// const win = new Promise((resolve) => {
//   setTimeout(() => resolve('yes'), 100);
// });

// Promise.any([fail, win]).then((value) => {
//   console.log(value); // "yes"
// });

// Turning a callback function into a promise
// An older function in the Day 15 error-first callback style.
function getPriceCb(product, callback) {
  setTimeout(() => {
    if (product === 'coffee') {
      callback(null, 3);
    } else {
      callback(new Error('Unknown product'));
    }
  }, 300);
}

// A wrapper that returns a promise instead of taking a callback.
function getPriceAsPromise(product) {
  return new Promise((resolve, reject) => {
    getPriceCb(product, (error, price) => {
      if (error) {
        reject(error); // pass a failure to the promise
        return;
      }
      resolve(price); // pass a success to the promise
    });
  });
}
