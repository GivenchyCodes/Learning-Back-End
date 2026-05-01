// Only disable if the environment is "production"
if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
  console.info = function () {};
  // You might want to keep .warn and .error for debugging production issues
}
