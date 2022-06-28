const CryptoJS = require("crypto-js");
const { getConnection } = require('typeorm');
const UserDetailsEntity = require('../entity/user_details.entity');
const {validationResult} = require('express-validator');
const {userDetailsDto} = require('../dtos/user_details');

const getAllUserDetails = async (req, res) => {
  return await getConnection().manager.
    createQueryBuilder(UserDetailsEntity, 'user_details')
    .select()
    .orderBy('CREATED_AT', "DESC")
    .addOrderBy('USER_ID', "DESC")
    .getMany()
    .then(userDetails => {
      res.status(200).json(userDetails.map(userDetail => {
        decrypt = () => {
          const hashSecret = process.env.HASH_SECRET;
          return CryptoJS.AES.decrypt(userDetail.PASSWORD, hashSecret).toString(CryptoJS.enc.Utf8);
        }
        return {
          USER_ID: userDetail.USER_ID,
          USERNAME: userDetail.USERNAME,
          CONTACT_NUMBER: userDetail.CONTACT_NUMBER,
          PASSWORD: decrypt(userDetail.PASSWORD),
          CREATED_AT: userDetail.CREATED_AT,
        }
      }))
    })
    .catch(err => {
      res.send(err)
    })
};

const createUserDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, contactNumber, password } = req.body;
  const userDetails = userDetailsDto(username, contactNumber, password);
  const userDetailsRepo = await getConnection().manager.getRepository(UserDetailsEntity)
  const newUserDetails = userDetailsRepo.create({...userDetails})
  userDetailsRepo.save(newUserDetails)
    .then(userDetails => {
      res.status(201).json(userDetails)
    })
    .catch(err => {
      console.log(err)
      if (err.code === 'SQLITE_CONSTRAINT') {
        res.status(400).json({ message: 'User already exists' })
      } else {
        res.status(500).send(err)
      }
  })
};

const deleteUserDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { userIds } = req.body;
  const userDetailsRepo = await getConnection().manager.getRepository(UserDetailsEntity)
  userDetailsRepo.createQueryBuilder(UserDetailsEntity)
    .delete()
    .where("USER_ID IN (:...userIds)", {userIds})
    .execute()
    .then(userDetails => {
      res.status(200).json(userDetails)
    }).catch(err => {
      res.status(500).send(err)
  });
};

module.exports = {
  getAllUserDetails,
  createUserDetails,
  deleteUserDetails,
}