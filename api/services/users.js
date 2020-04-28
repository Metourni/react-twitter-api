const TwitterApi = require("./twitterApi");

const getUsers = async (params) => {
  return await TwitterApi.get('users/search', params)
    .then(result => {
      console.log('result: ', result);
      return result
    })
    .catch(error => {
      console.log('Error getting Users: ', error);
      return null;
    })
}

const show = async (id) => {
  return await TwitterApi.get('users/search', params)
    .then(result => {
      console.log('result: ', result);
      return result
    })
    .catch(error => {
      console.log('Error getting Users: ', error);
      return null;
    })
}

module.exports = {
  getUsers
}
