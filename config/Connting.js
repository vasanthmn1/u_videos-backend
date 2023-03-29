const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const conntingMongo = async () => {
    try {
        const connet = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connate DB ${connet.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
    }
}
module.exports = conntingMongo