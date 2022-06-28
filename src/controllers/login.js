const {validationResult} = require('express-validator');
const { getConnection } = require('typeorm');
const CryptoJS = require("crypto-js");
const UserDetailsEntity = require('../entity/user_details.entity');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const userDetailsRepo = await getConnection().manager.getRepository(UserDetailsEntity)

  decrypt = (password) => {
    const hashSecret = process.env.HASH_SECRET;
    return CryptoJS.AES.decrypt(password, hashSecret).toString(CryptoJS.enc.Utf8);
  }

  userDetailsRepo.findOne({where: {USERNAME: username}})
    .then(userDetails => {
      if(userDetails) {
        if(password === decrypt(userDetails.PASSWORD)) {
          // Generate JWT token
          let jwtSecret = process.env.JWT_SECRET_KEY;
          const token = jwt.sign({
              username: userDetails.USERNAME,
              _id: userDetails.USER_ID
            }, jwtSecret, {
                expiresIn: '1h'
          });
          res.status(200).json({token})
        } else {
          res.status(401).json({message: "Invalid credentials"})
        }
      } else {
        res.status(401).json({message: "Invalid credentials"})
      }
    }).catch(err => {
      res.send(err)
  });
}

module.exports = {
    login,
}