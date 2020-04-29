// check if user attr contain a given string
const searchInsideUser = (userAttr, value, matchCase = false) =>
  (user) => {
    // check if attr exists inside the user object.
    const userObjectHasKeyProperty = Object.prototype.hasOwnProperty.call(user, userAttr);
    if (!userObjectHasKeyProperty) {
      // property doesn't exist on either object
      return 0;
    }

    const string = (typeof user[userAttr] === 'string')
      ? user[userAttr] : user[userAttr].toString();

    const searchedValue = matchCase ? value : new RegExp(value, 'i');
    const search = string.search(searchedValue)

    return search !== -1;
  }

module.exports = {
  searchInsideUser
}
