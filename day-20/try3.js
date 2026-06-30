/**
 * DATA TRANSFORMATION UTILITY
 * Hydrates raw backend JSON payloads into rich, performance-optimized Map and Set models.
 */

// Simulated backend payload from a database fetch
const mockApiResponse = {
  status: 'success',
  generatedAt: '2026-06-30T12:00:00Z',
  data: {
    categoryTags: [
      'electronics',
      'smart-home',
      'appliances',
      'electronics',
      'smart-home',
    ], // Contains duplicates!
    products: [
      { uuid: 'prod-abc', details: { title: 'Smart Speaker', stock: 45 } },
      { uuid: 'prod-def', details: { title: '4K Television', stock: 12 } },
      { uuid: 'prod-ghi', details: { title: 'Robot Vacuum', stock: 0 } },
    ],
  },
};

class ApiDataHydrator {
  static parsePayload(apiJson) {
    // 1. Instantly deduplicate data using a Set
    const uniqueTags = new Set(apiJson.data.categoryTags);

    // 2. Transform the product array into an O(1) lookup Map
    const inventoryMap = new Map();

    apiJson.data.products.forEach((item) => {
      // Map key: string index (uuid) -> value: complex configuration object
      inventoryMap.set(item.uuid, {
        name: item.details.title,
        inStock: item.details.stock > 0,
        qty: item.details.stock,
      });
    });

    return {
      metadata: { serverTime: apiJson.generatedAt },
      tagsPool: uniqueTags,
      inventory: inventoryMap,
    };
  }
}

// Execution and verification
const processedData = ApiDataHydrator.parsePayload(mockApiResponse);

console.log('\n--- HYDRATED API RESULTS ---');
// Check the Set: Note how duplicates are gone
console.log('Unique Tags Set size:', processedData.tagsPool.size); // Output: 3
console.log(
  "Has 'electronics' tag?:",
  processedData.tagsPool.has('electronics'),
); // Output: true

// Check the Map: Read data in constant O(1) time
console.log('Total unique items mapped:', processedData.inventory.size); // Output: 3
console.log(
  "Fetch single item profile ('prod-def'):",
  processedData.inventory.get('prod-def'),
);
