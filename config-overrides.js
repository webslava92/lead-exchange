const {
  addWebpackAlias,
  override,
} = require('customize-cra');
const path = require('path');

module.exports = override(addWebpackAlias({
  '@ui': path.resolve(__dirname, './src/ui'),
  '@pages': path.resolve(__dirname, './src/pages'),
  '@features': path.resolve(__dirname, './src/features'),
  '@lib': path.resolve(__dirname, './src/lib'),
  '@api': path.resolve(__dirname, './src/api'),
  '@api-v2': path.resolve(__dirname, './src/api/v2'),
  '@queries': path.resolve(__dirname, './src/queries'),
  '@common': path.resolve(__dirname, './src/common'),
}));
