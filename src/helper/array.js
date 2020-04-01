export const compareArrayOfObject = (key,order = 'asc') =>
  (object1, object2) => {
    if (!object1.hasOwnProperty(key) || !object2.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    // if the values are strings convert to upper case before comparing.
    // to ignore character casing
    const value1 = (typeof object1[key] === 'string')
      ? object1[key].toUpperCase() : a[key];
    const value2 = (typeof object2[key] === 'string')
      ? object2[key].toUpperCase() : b[key];


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

export default {
  compareArrayOfObject
}
