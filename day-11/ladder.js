//
const ladder = {
  step: 0,
  up() {
    this.step += 1;
    return this;
  },
  down() {
    this.step -= 1;
    return this;
  },
  showStep() {
    console.log(this.step);
    return this;
  },
};

// Execution example:
ladder.up().up().down().showStep().down().showStep();
