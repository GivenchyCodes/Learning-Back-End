// i use a calculator prompt input for Day 11 task
import { isValidNumber } from './validator.ejs';

export default function subtract(a, b) {
  if (!isValidNumber(a)) {
    throw new TypeError(
      `Invalid first argument 'a': expected a finite number but received ${typeof a} (${a})`,
    );
  }
  if (!isValidNumber(b)) {
    throw new TypeError(
      `Invalid second argument 'b': expected a finite number but received ${typeof b} (${b})`,
    );
  }

  return a - b;
}
