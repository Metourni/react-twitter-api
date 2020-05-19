const TwitterApi = require("./twitterApi");

const searchUsers = async (params) => {
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

const getUserFollowers = async (params) => {
  return await TwitterApi.get('followers/list', params)
    .then(result => {
      // console.log('result: ', result);
      return result
    })
    .catch(error => {
      console.log('Error getting Users: ', error);
      return null;
    })
}

const show = async (params) => {
  return await TwitterApi.get('users/show', params)
    .then(result => {
      // console.log('result: ', result);
      return result
    })
    .catch(error => {
      console.log('Error getting Users: ', error);
      return null;
    })
}

module.exports = {
  searchUsers,
  getUserFollowers,
  show
}
