import mongoose from 'mongoose';

require('dotenv').config();
console.log('here...', process.env.MONGODB_URI_LOCAL)

// local mongodb://localhost/api_db;

mongoose.connect(process.env.MONGODB_URI_LOCAL, {
    useNewUrlParser            : true,
    useUnifiedTopology         : true,
    useFindAndModify           : false,
    useCreateIndex             : true,
})
.then(db => console.log('DB is connected'))
.catch(error => console.log(error))