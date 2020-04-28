const UsersService = require('../services/users')

const show = async (req, res) => {
  const result = await UsersService.show(params)
  return res.json({users: result})
}

/*
* Todo: get new access token and do the right request.
*
* */
const getUsers = async (req, res) => {
  const {query}= this.params
  const params = {
    q: 'elonmusk',
    count: 5
  };
  const result = await UsersService.getUsers(params)
  return res.json({users: result})
}

module.exports = {
  getUsers,
  show
}
