var CryptoJS = require("crypto-js");

const userDetailsDto = (userName, contactNumber, password) => {
    const hashSecret = process.env.HASH_SECRET;
    return {
        USERNAME: userName,
        CONTACT_NUMBER: contactNumber,
        PASSWORD: CryptoJS.AES.encrypt(password, hashSecret).toString(),
    }
}

module.exports = {userDetailsDto};