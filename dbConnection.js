const dotenv = require('dotenv')
const typeorm = require('typeorm');
const UserDetailsEntity = require('./src/entity/user_details.entity');

dotenv.config()

// DB Config
connection = typeorm.createConnection({
  type: "sqlite",
  database: "backend-test.db",
  entities: [
      UserDetailsEntity
  ],
  synchronize: true,
  logging: false
})

module.exports = {
  connection,
}
