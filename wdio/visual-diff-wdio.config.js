let allureReport = require('wdio-allure-reporter');
let base64Img = require('base64-img');

exports.config = {
 ...
  afterCommand: function(commandName, args, result, error) {
    if (result && result[0] && result[0].misMatchPercentage) {
      let imageTo64 = base64Img
        .base64Sync(`screenshots/diff/${fileName}`)
        .replace('data:image/png;base64,', '');
      allureReport.createAttachment(
        'Diff image',
        Buffer.from(imageTo64, 'base64'),
        'image/png'
      );
    }
  },
};

let fileName;
function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;
    fileName= `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`;
    return path.join(basePath, fileName);
  };
}