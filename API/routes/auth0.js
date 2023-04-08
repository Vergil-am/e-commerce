const router = require("express").Router();
const jose = require('jose')
const alg = 'RS256'

// req.isAuthenticated is provided from the auth router
const jwk = {
  kty: 'RSA',
  n: 'qZQ7DT2k-VxQxlwdFc4abC-EUkGqPiofe3ivBAgrF_YRv_lgQ53zDs9ZS-AEvkPHL2kUaXFmnfe1zPI5ws9CwBtmxPy82W8hZaeisEVZpkLhXD7BTjg5cvhXSG_eNNkr8pX2BaUZiWMnoW6LMY1fp6kyCDn2a0YXxdppH1-xurQtZjEocsJBqYbOyk9DqX1p4w8qpvviXjIL2LvjyuAwuPznF2f7vwazHfymC83CRA1dCpSKu1HBFf-hmcAGt-DvdU66zEbO7Kvs4u6FAhcaeu5Syf43gq-73ZK5XPK_xDEp1VcELzMG7awoPm-23yESrp6pO6Dq5Zl_06uor0DYZQ',
  e: 'AQAB',
} 
const verifyAuth0 = async (req, res, next) => {
  const token = req.headers.header
  if (token) {
    const jwt = token.split(" ")[2]

    const publicKey = await jose.importJWK(jwk, alg)
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, publicKey, {
      issuer: 'https://dev-qk3ei1ro2sxsvt5m.us.auth0.com/',
      audience: 'http://localhost:5000/',
    })
    next();
  } else{
    res.status(401).json('not authorized')
  }


}



module.exports = verifyAuth0;
