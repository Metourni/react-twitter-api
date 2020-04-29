const UsersService = require('../services/users')
const SearchHelper =  require('../helpers/search');
/*
*
* Description: show user information.
* Params: user_id
* response: {user:{...}} or 404.
*
* */
const show = async (req, res) => {
  const {id}= req.params;
  const params ={
    user_id:id
  };
  const result = await UsersService.show(params)
  // console.log(result)
  if(result && result.data){
    return res.json({user: result.data})
  }else{
    return res.status(404).json("Not found")
  }
}

/*
* Todo: get new access token and do the right request.
*
* Because this account doesn't have the necessary permission to search on user
* I will search in the follower in any famous account
* In this example I am using Elon Musk account
* */
const search = async (req, res) => {
  const {query}= req.params
  console.log("query: ",query)
  const params = {
    cursor:-1,
    screen_name:'elonmusk',
    count: 10
  };
  // ?cursor=-1&screen_name=MetourniN&count=5
  const result = await UsersService.getUserFollowers(params)

  // console.log('size: ',result.data)
  if(
    result &&
    result.data &&
    result.data.users &&
    result.data.users.length>0
  ){
    let followers = result.data.users;
    let names= followers.map(user=>user.name);
    // console.log("names: ",names);
    // search inside followers
    followers= followers.filter(SearchHelper.searchInsideUser('name',query,false))
    return res.json({users: followers})
  }else{
    return res.status(404).json("Not found")
  }
}

module.exports = {
  search,
  show
}
