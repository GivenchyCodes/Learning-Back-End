const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Fiona' },
  { id: 4, name: 'Paula' },
  { id: 5, name: 'Kevin' },
  { id: 6, name: 'George' },
  { id: 7, name: 'Hannah' },
  { id: 8, name: 'Oscar' },
  { id: 9, name: 'Steve' },
  { id: 10, name: 'Ian' },
  { id: 11, name: 'Julia' },
  { id: 12, name: 'Tina' },
];

console.group('Fetch User Data');
console.log('Starting API call...');
console.table(users); // Displays a pretty table in the browser
console.groupEnd();
