const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const conntingMongo = require('./config/Connting')

const authroutes = require('./routes/authRoutes')
const userRoute = require('./routes/userroutes')
const videoRoute = require('./routes/videoRoutes')
const commentsRoutes = require('./routes/commentsRoutes')

const port = process.env.PORT || 8000
conntingMongo()
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieparser())
app.use('/auth', authroutes)
app.use("/user", userRoute)
app.use("/video", videoRoute)
app.use("/comment", commentsRoutes)



app.listen(port, () => {
    console.log(`app listion ${port}`);
})

