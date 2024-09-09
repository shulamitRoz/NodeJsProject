const mongoose=require("mongoose");
// const MONGO_URI_="mongodb://127.0.0.1:27017/toys"
const connectDB = async () => {
    // await mongoose.connect(MONGO_URI_);
    await mongoose.connect(process.env.DB_CONNECT)
};
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log('Database Connected');
})
module.exports=connectDB;