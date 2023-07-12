import mongoose from 'mongoose';

require('dotenv').config();
console.log('here...', 'mongodb://127.0.0.1:27017/delivery')

// local mongodb://localhost/api_db;

//mongodb+srv://juangonzaleze04:KP62oIn2vSm4vDxW@api-delivery.clnjwua.mongodb.net/api-delivery?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://juangonzaleze04:KP62oIn2vSm4vDxW@api-delivery.clnjwua.mongodb.net/api-delivery?retryWrites=true&w=majority', {
    useNewUrlParser            : true,
    useUnifiedTopology         : true,
    useFindAndModify           : false,
    useCreateIndex             : true,
})
.then(db => console.log('DB is connected'))
.catch(error => console.log(error))