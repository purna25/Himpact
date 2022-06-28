const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const { connection } = require('./dbConnection');


const userDetailsRouter = require('./src/routes/userDetails.routes')
const loginRouter = require('./src/routes/auth.routes')


app = express()

// Middlewares
app.use([
  cors(),
  express.urlencoded({extended: false}),
  express.json(),
])

app.use('/user-details', userDetailsRouter)
app.use('/login', loginRouter)

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, host, () => {
    console.log(`Server listening on http://localhost:${port}`)
    // connection.manager.createQueryBuilder(UserDetails, 'user_details').select().orderBy('CREATED_AT', "ASC").getMany().then(userDetails => {
    //     console.log(userDetails);
    // })
})
