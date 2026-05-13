// From a resources of 2D Matrix cointaining TARGET string
const grid = [
  ['EMPTY', 'EMPTY', 'EMPTY'],
  ['EMPTY', 'TARGET', 'EMPTY'],
  ['EMPTY', 'EMPTY', 'EMPTY'],
];

function findTarget() {
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j] === 'TARGET') {
        console.log('Found it!');
        return { i, j };
      }
    }
  }
  return null;
}

findTarget(grid);

// mordern Approach Functional approach

let found = false;

grid.some((row) => {
  const hasTarget = row.includes('TARGET');
  if (hasTarget) {
    console.log('Found it!');
    found = true;
  }
  return hasTarget;
});
