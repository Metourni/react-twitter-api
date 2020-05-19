const UsersService = require('../services/users')

/*
* Description: show user information.
* Params: user_id
* response: {user:{...}} or 404.
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
* I will search only of Barack Obama account because it famous and contains many new post
* */
const search = async (req, res) => {
  const {query}= req.params
  console.log("query: ",query)

  const searchParams = {
    q: query,
    count: 5
  };
  const result = await UsersService.searchUsers(searchParams)
  // console.log('results: ',result)

  /*
  const params ={
    screen_name:'BarackObama',
    include_entities:false
  };
  */
  // const result = await UsersService.show(params)
  if(
    result &&
    result.data &&
    result.data.length>0
  ){
    // followers= followers.filter(SearchHelper.searchInsideUser('name',query,false))
    return res.json({users: result.data})
  }else{
    return res.status(404).json("Not found")
  }
}

module.exports = {
  search,
  show
}
