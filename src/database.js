import mongoose from 'mongoose';

require('dotenv').config();
console.log('here...', 'mongodb://127.0.0.1:27017/ecommerce')

// local mongodb://localhost/api_db;

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
    useNewUrlParser            : true,
    useUnifiedTopology         : true,
    useFindAndModify           : false,
    useCreateIndex             : true,
})
.then(db => console.log('DB is connected'))
.catch(error => console.log(error))