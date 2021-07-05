module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{json,ico,png,html,txt,js,css,jpg,config}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'build/sw.js',
};
