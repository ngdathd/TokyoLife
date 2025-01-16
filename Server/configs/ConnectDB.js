const { default: mongoose } = require('mongoose')

module.exports = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        if (conn.connection.readyState === 1) {
            console.log('MongoDB connected successfully')
        } else {
            console.log('Connected failed');
        }
    } catch (error) {
        console.log(error)
    }
}

