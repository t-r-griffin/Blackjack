const { injectManifest } = require('workbox-build');

// NOTE: This should be run after all assets are built
const swSrc = 'src/sw-template.js'; // this is the sw template file
const swDest = 'build/sw.js'; // this will be created in the build step
// This will return a Promise
injectManifest({
  swSrc,
  swDest,
  globDirectory: 'build',
  globPatterns: ['**/!(service-worker|precache-manifest.*).{js,css,html,png}'],
  injectionPoint: 'self.__WB_MANIFEST',
}).then(({ count, size, warnings }) => {
  // Optionally, log any warnings and details.
  warnings.forEach(console.warn);
  console.log(`${count} files will be precached, totaling ${size} bytes.`);
});
