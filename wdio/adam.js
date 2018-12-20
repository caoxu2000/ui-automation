chai.Assertion.addMethod('existing', function() {
    const negate = !!utils.flag(this, 'negate');
    const object = utils.flag(this, 'object');
    const eventually = utils.flag(this, 'eventually');
    let element = null;
    let isExisting = false;

    try {
      browser.waitUntil(
        () => {
          element = makeElementResult(object);
          isExisting = element && element.elementId ? element.isExisting() : false;
          return isExisting !== negate;
        },
        eventually ? timeout : 0
      );
    } catch (error) {
      //Swallow the exception as we want the assert error instead of
      //the timeout
      isExisting = negate;
    }

    //A false result with a false expectation is good
    this.assert(
      isExisting,
      `Expected ${
        element ? element.selector : 'Element'
      } to exist within ${timeout}ms, but it does not.`,
      `Expected ${
        element ? element.selector : 'Element'
      } to not exist within ${timeout}ms, but it does.`
    );
  });

//Converts a string or function to the resulting element
const makeElementResult = object => {
  let element = null;

  if (typeof object === 'function') {
    try {
      element = object();
    } catch (error) {
      //In negative tests, we expect the function
      //to fail
      element = null;
    }
    // In case someone passes a selector instead of an
    // element function
    if (typeof element === 'string') {
      element = $(element);
    }
  } else if (typeof object === 'string') {
    element = $(object);
  } else {
    element = object;
  }
  return element;
};