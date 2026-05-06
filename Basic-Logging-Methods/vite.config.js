export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
