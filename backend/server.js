const express = require('express') ;
const app = express();
const userRoutes = require('./routes/userRoutes');
const connect = require('./connection');
const cors = require('cors');
const postRoutes = require('./routes/postRoute');
const todolistRoutes = require('./routes/todolistRoute');

const dotenv = require('dotenv');

dotenv.config({path: '../config.env'})

app.use(cors());

const PORT = process.env.PORT || 5000

app.get("/", (req,res)=>{
    res.json("Hello Home Page")
})

connect();
app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));
app.use('/users', userRoutes);
app.use('/posts', postRoutes );
app.use('/lists', todolistRoutes);

app.listen( PORT, ()=>{
    console.log('Server is running ');
})