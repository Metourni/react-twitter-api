
// todo: get info from .env file
module.exports = {
  twitter:{
    api:{
      baseUrl:"https://api.twitter.com/1.1",
      // LCqrdRENSgRMwuTt45WlNjj1s:U5VU3QavQy9gixnp1j3fpQxSw8LXeJnyWkcv6ug5SgPDGTDz8i
      // base64: TENxcmRSRU5TZ1JNd3VUdDQ1V2xOamoxczpVNVZVM1FhdlF5OWdpeG5wMWozZnBReFN3OExYZUpueVdrY3Y2dWc1U2dQREdURHo4aQ==
      key:"LCqrdRENSgRMwuTt45WlNjj1s",
      secretKey:"U5VU3QavQy9gixnp1j3fpQxSw8LXeJnyWkcv6ug5SgPDGTDz8i",
      accessToken:"1246017158569697280-0eHsWmIkZP6jtTWUAb0gY6SAQzCfOm",
      accessTokenSecret:"VnZfcB2juBwdsLp9FwEDLHQQrcBvgRkZYGgFr3pMm4qeV",
      // I used post man to get this token
      // using the end point https://api.twitter.com/oauth2/token?grant_type=client_credentials
      bearerToken:"AAAAAAAAAAAAAAAAAAAAAPGoDQEAAAAAy%2Fv6S0ek6uO2HrQ%2BjoZLG4G6%2BL4%3DAazIxCYcPnT9z1gcHWut2ZJFP5M9fQ6LsNspiXf9BhiqKzJGs8"
    }
  }
};
