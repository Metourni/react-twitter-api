const Twit = require('twit')

const config =require('../config')

const apiConfig = {
  consumer_key: config.twitter.api.key,
  consumer_secret: config.twitter.api.secretKey,
  access_token: config.twitter.api.accessToken,
  access_token_secret: config.twitter.api.accessTokenSecret,
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  // strictSSL:            true,     // optional - requires SSL certificates to be valid.

  // If authenticating with application context, config should contain app_only_auth: true
  // app_only_auth: true,
}

module.exports= new Twit(apiConfig);
