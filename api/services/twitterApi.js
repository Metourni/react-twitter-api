const Twit = require('twit')

const config =require('../config')

const apiConfig = {
  consumer_key:config.twitter.api.key,
  consumer_secret:config.twitter.api.secretKey,
  access_token: config.twitter.api.bearerToken,
  // access_token:         '...',
  // access_token_secret:  '...',
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  // strictSSL:            true,     // optional - requires SSL certificates to be valid.
  app_only_auth: true,
}

module.exports= new Twit(apiConfig);
