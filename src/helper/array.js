// eslint-disable-next-line import/prefer-default-export
const compareArrayOfObject = (key, order = 'asc') => (
  (object1, object2) => {
    const object1HasKeyProperty = Object.prototype.hasOwnProperty.call(object1, key);
    const object2HasKeyProperty = Object.prototype.hasOwnProperty.call(object2, key);
    if (!object1HasKeyProperty || !object2HasKeyProperty) {
      // property doesn't exist on either object
      return 0;
    }

    // if the values are strings convert to upper case before comparing.
    // to ignore character casing
    const value1 = (typeof object1[key] === 'string')
      ? object1[key].toUpperCase() : object1[key];
    const value2 = (typeof object2[key] === 'string')
      ? object2[key].toUpperCase() : object2[key];


    let comparison = 0;
    if (value1 > value2) {
      comparison = 1;
    } else if (value1 < value2) {
      comparison = -1;
    }

    // check the order.
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  }
)

export default {
  compareArrayOfObject
}
