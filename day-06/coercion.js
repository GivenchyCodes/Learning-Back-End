// '53' - The '+' operator makes the string concatenation(adding a string and a number) if one operand is a string.
console.log(Number('5') + 3);

// 2 - The '-' operator only works on numbers, forcing '5' to numeric 5.
console.log('5' - 3);

// 2 - The boolean true is implicitly coerced to the number 1 during addition.
console.log(true + 1);

// 5 - The value null is implicitly coerced to 0 during numeric operations.
console.log(null + 5);

// NaN - undefined converted to a number results in NaN. Any math with NaN yields NaN.
console.log(undefined + 5);

// false - Strict equality (===) checks both value and type without coercion.
console.log('5' === 5);

// true - Loose equality (==) coerces the string '5' to number 5 before comparing.
console.log('5' && 5);

function isLooselyEqual(value1, value2) {
  // This will bypass the eslint
  return value1 && value2;
}
console.log(isLooselyEqual('5', 5));

// Object Mutability with const
const userProfile = {
  username: 'Melroy',
  role: 'Developer',
};

// This works because 'const' prevents reassignment of the variable identifier itself
// (i.e., you cannot do userProfile = {}). It does not make the object value immutable.
userProfile.role = 'Senior Developer';

console.log(userProfile);
