// Task 1: Create the book object
const book = {
  title: 'The BSK',
  author: 'A.G.E. Givenchicodes',
  year: 2026,
  genres: ['Tech', 'Coding'],
  rating: 4.8,
};

// Task 2: Property Manipulation Functions add.
function addProperty(obj, key, value) {
  return { ...obj, [key]: value };
}
console.log(addProperty);
// Task 2: Property Manipulation Functions
//function addProperty(obj, key, value) {
//value = obj[key];
//return obj;
//}

// Property Manipulation Functions update
function updateProperty(obj, key, newValue) {
  if (key in obj) {
    return { ...obj, [key]: newValue };
  }
  {
    // Capture the newly created objects in a new variable
    const updatedBook = addProperty(book, 'isBestseller', true);
    const finalBook = updateProperty(updatedBook, 'rating', 4.9);
  }
  return obj;
}
console.log(updateProperty);

// Property Manipulation Functions delete
function deleteProperty(obj, key) {
  delete obj[key];
  return obj;
}
console.log(deleteProperty);

// Property Manipulation Functions hasproperty
function hasProperty(obj, key) {
  // Checks via prototype chain (in) and direct ownership (hasOwnProperty)
  return {
    hasIn: key in obj,
    hasOwn: Object.prototype.hasOwnProperty.call(obj, key),
  };
}
console.log(' Initial Check ');
console.log(hasProperty(book, 'rating'));

// Task 3: Iteration Demonstration
function iterateBook(obj) {
  console.log('--- Keys ---', Object.keys(obj));
  console.log('--- Values ---', Object.values(obj));
  console.log('--- Entries ---');

  Object.entries(obj).forEach(([key, value]) =>
    console.log(`${key}: ${value}`),
  );
}

// Task 4: Destructuring Demonstration
function destructureBook(obj) {
  // Basic destructuring, renaming, and default values
  const { title, author: bookAuthor, publisher = 'Unknown' } = obj;
  console.log(
    `Title: ${title}, Author: ${bookAuthor}, Publisher: ${publisher}`,
  );

  // Nested destructuring example
  const advancedBook = { ...obj, info: { pages: 310, language: 'English' } };
  const {
    info: { pages, language },
  } = advancedBook;
  console.log(`Pages: ${pages}, Language: ${language}`);
}

// Task 5: Manual Merge Function Using Spread Syntax

function mergeObjects(target, ...sources) {
  return sources.reduce((acc, source) => ({ ...acc, ...source }), {
    ...target,
  });
}

//  Execution & Testing
console.log('Original Book:', book);

addProperty(book, 'isBestseller', true);
updateProperty(book, 'rating', 4.9);
console.log('After Add & Update:', book);

console.log("Property checks for 'rating':", hasProperty(book, 'rating'));

iterateBook(book);
destructureBook(book);

const extraDetails1 = { pages: 310 };
const extraDetails2 = { language: 'English', rating: 5.0 }; // overwrites rating
const merged = mergeObjects(book, extraDetails1, extraDetails2);
console.log('Merged Object:', merged);

deleteProperty(book, 'isBestseller');
