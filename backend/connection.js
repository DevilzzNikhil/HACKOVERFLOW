const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE



const connect = () => {

    mongoose.connect(DB, () => {
        console.log("mongodb connected");
    })
}

module.exports = connect ;