let ladder = {
  step: 0,
  up() {
    this.step = +1;
  },
  down() {
    this.step -= 1;
  },
  showStep: function () {
    // shows the current step
    console.log(this.step);
  },
};

// console.log
console.log(
  ladder
    .up()
    .ladder.up()
    .ladder.down()
    .ladder.showStep()
    .ladder.down()
    .ladder.showStep(),
);
