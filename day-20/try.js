/**
 * PRODUCTION-READY ADVANCED COLLECTIONS SYSTEM
 * Architecture Overview: High-Performance Data Utilities
 */

// ==========================================
// 1. TASK 1 REAL USE: UI Component State Registry
// ==========================================
class ComponentRegistry {
  constructor() {
    // Map stores actual DOM element objects or instance objects as keys
    this.activeComponents = new Map();
  }

  registerComponent(componentInstance, defaultState) {
    this.activeComponents.set(componentInstance, defaultState);
  }

  updateComponentState(componentInstance, updatedState) {
    if (!this.activeComponents.has(componentInstance)) return;

    const currentState = this.activeComponents.get(componentInstance);
    this.activeComponents.set(componentInstance, {
      ...currentState,
      ...updatedState,
    });
  }

  getStats() {
    // Uses .size to immediately show active component counts
    return { totalActiveElements: this.activeComponents.size };
  }
}

// ==========================================
// 2. TASK 2 REAL USE: E-Commerce Filter Engine
// ==========================================
class ProductFilterEngine {
  /**
   * Union: Combines categories cleanly for a "View All Selected Categories" grid
   */
  mergeProductTags(tagsCategoryA, tagsCategoryB) {
    return [...new Set([...tagsCategoryA, ...tagsCategoryB])];
  }

  /**
   * Intersection: Finds common tags to recommend "Similar Products You May Like"
   */
  findCommonInterests(userAHashes, userBHashes) {
    const compareSet = new Set(userBHashes); // O(1) optimization
    return userAHashes.filter((tag) => compareSet.has(tag));
  }
}

// ==========================================
// 3. TASK 3 REAL USE: Live Search Analytics Counter
// ==========================================
class SearchAnalytics {
  analyzeTrendingKeywords(searchQueryString) {
    const analyticsMap = new Map();
    // Normalize and extract words
    const cleanTokens = searchQueryString.toLowerCase().match(/\b\w+\b/g) || [];

    // Frequency distribution pattern
    cleanTokens.forEach((word) => {
      analyticsMap.set(word, (analyticsMap.get(word) || 0) + 1);
    });

    return analyticsMap;
  }
}

// ==========================================
// 4. TASK 4 REAL USE: Memory-Safe API Cache
// ==========================================
class SessionCacheManager {
  constructor() {
    // WeakMap ensures that when the user logs out and their session object is deleted,
    // their massive cached profile data disappears from memory automatically.
    this.apiResponseCache = new WeakMap();
  }

  async fetchUserProfile(sessionTokenObject) {
    // 1. Check Memory Cache
    if (this.apiResponseCache.has(sessionTokenObject)) {
      return {
        data: this.apiResponseCache.get(sessionTokenObject),
        source: 'Memory Cache',
      };
    }

    // 2. Simulate Network Fetching
    const liveFetchResult = {
      username: 'AlexDev',
      permissions: ['READ', 'WRITE_SYSTEM'],
      fetchedTimestamp: Date.now(),
    };

    // 3. Store in Memory Cache
    this.apiResponseCache.set(sessionTokenObject, liveFetchResult);
    return { data: liveFetchResult, source: 'Network Database' };
  }
}

// ==========================================
// RUNNING THE SYSTEM (MOCKING A PRODUCTION ENVIRONMENT)
// ==========================================
const runLiveAppDemo = async () => {
  console.log('--- SYSTEM INITIALIZED ---\n');

  // --- Test Case 1: Maps for UI Components ---
  const uiRegistry = new ComponentRegistry();
  const sidebarWidget = { elementId: 'left-sidebar', version: '1.2.0' };
  const topNavbar = { elementId: 'main-nav', version: '2.0.1' };

  uiRegistry.registerComponent(sidebarWidget, { open: true, theme: 'dark' });
  uiRegistry.registerComponent(topNavbar, { sticky: false });
  uiRegistry.updateComponentState(sidebarWidget, { theme: 'light' });

  console.log('Task 1 (UI Component Map Size):', uiRegistry.getStats());

  // --- Test Case 2: Sets for Product Tag Intersections ---
  const filtering = new ProductFilterEngine();
  const shoeTags = ['running', 'waterproof', 'sale', 'sports'];
  const jacketTags = ['winter', 'waterproof', 'windbreaker', 'sale'];

  console.log(
    'Task 2 (Union - All unique filtering tags):',
    filtering.mergeProductTags(shoeTags, jacketTags),
  );
  console.log(
    'Task 2 (Intersection - Common matching tags):',
    filtering.findCommonInterests(shoeTags, jacketTags),
  );

  // --- Test Case 3: Word Counting for Analytics ---
  const searchTracker = new SearchAnalytics();
  const rawSearchInput =
    'React components are fast. React state makes components scalable.';
  const keywordsReport = searchTracker.analyzeTrendingKeywords(rawSearchInput);

  console.log(
    "Task 3 (Analytics Word Counter - 'react' frequency):",
    keywordsReport.get('react'),
  );
  console.log(
    "Task 3 (Analytics Word Counter - 'components' frequency):",
    keywordsReport.get('components'),
  );

  // --- Test Case 4: WeakMap for Secure API Memoization ---
  const networkManager = new SessionCacheManager();

  // Create a temporary User Session reference
  let activeUserSession = { token: 'auth-jwt-9988XyZ' };

  // First call hits network database
  const callOne = await networkManager.fetchUserProfile(activeUserSession);
  console.log(`Task 4 (Call 1 Source): ${callOne.source}`);

  // Second call hits performance cache instantly
  const callTwo = await networkManager.fetchUserProfile(activeUserSession);
  console.log(`Task 4 (Call 2 Source): ${callTwo.source}`);

  // User logs out: We break the reference
  activeUserSession = null;
  console.log(
    'Task 4 Cache Safety: Session set to null. WeakMap clears payload automatically in the background.',
  );
};

runLiveAppDemo();
