// /**
//  * PERFORMANCE BENCHMARK ENGINE
//  * Compares Array lookup vs Map lookup speed on a large dataset.
//  */
// const runPerformanceBenchmark = () => {
//   const datasetSize = 100000; // 100k items
//   const targetId = 'item-99999'; // The item we want to find (near the end)

//   // 1. Setup Mock Data
//   const rawArray = [];
//   const performanceMap = new Map();

//   for (let i = 0; i < datasetSize; i += 1) {
//     const id = `item-${i}`;
//     const data = {
//       id,
//       name: `Product Number ${i}`,
//       price: Math.random() * 100,
//     };

//     rawArray.push(data);
//     performanceMap.set(id, data);
//   }

//   console.log(
//     `\n--- BENCHMARKING WITH ${datasetSize.toLocaleString()} ITEMS ---`,
//   );

//   // 2. Measure Array Lookup Speed O(N)
//   const arrayStart = performance.now();
//   const foundInArray = rawArray.find((item) => item.id === targetId);
//   const arrayEnd = performance.now();
//   const arrayTime = arrayEnd - arrayStart;
//   console.log(`Array .find() Execution Time: ${arrayTime.toFixed(4)} ms`);

//   // 3. Measure Map Lookup Speed O(1)
//   const mapStart = performance.now();
//   const foundInMap = performance.map.has(targetId)
//     ? performanceMap.get(targetId)
//     : null;
//   const mapEnd = performance.now();
//   const mapTime = mapEnd - mapStart;
//   console.log(`Map .get() Execution Time:   ${mapTime.toFixed(4)} ms`);

//   // Calculate relative speed difference
//   const speedMultiplier = (arrayTime / (mapTime || 0.0001)).toFixed(1);
//   console.log(
//     `>> Result: Map lookup was roughly ${speedMultiplier}x faster than Array lookups!`,
//   );
// };

// runPerformanceBenchmark();

/**
 * PERFORMANCE BENCHMARK ENGINE
 * Compares Array lookup vs Map lookup speed on a large dataset.
 */
const runPerformanceBenchmark = () => {
  const datasetSize = 100000; // 100k items
  const targetId = 'item-99999'; // The item we want to find (near the end)

  // 1. Setup Mock Data
  const rawArray = [];
  const performanceMap = new Map(); // Variable is defined correctly here

  for (let i = 0; i < datasetSize; i += 1) {
    const id = `item-${i}`;
    const data = {
      id,
      name: `Product Number ${i}`,
      price: Math.random() * 100,
    };

    rawArray.push(data);
    performanceMap.set(id, data);
  }

  console.log(
    `\n--- BENCHMARKING WITH ${datasetSize.toLocaleString()} ITEMS ---`,
  );

  // 2. Measure Array Lookup Speed O(N)
  const arrayStart = performance.now();
  const foundInArray = rawArray.find((item) => item.id === targetId);
  const arrayEnd = performance.now();
  const arrayTime = arrayEnd - arrayStart;
  console.log(`Array .find() Execution Time: ${arrayTime.toFixed(4)} ms`);

  // 3. Measure Map Lookup Speed O(1)
  const mapStart = performance.now();
  // FIXED: Changed 'performance.map.has' to 'performanceMap.has'
  // FIXED: Changed 'performanceMap.get' reference as well
  const foundInMap = performanceMap.has(targetId)
    ? performanceMap.get(targetId)
    : null;
  const mapEnd = performance.now();
  const mapTime = mapEnd - mapStart;
  console.log(`Map .get() Execution Time:   ${mapTime.toFixed(4)} ms`);

  // Calculate relative speed difference
  const speedMultiplier = (arrayTime / (mapTime || 0.0001)).toFixed(1);
  console.log(
    `>> Result: Map lookup was roughly ${speedMultiplier}x faster than Array lookups!`,
  );
};

runPerformanceBenchmark();
