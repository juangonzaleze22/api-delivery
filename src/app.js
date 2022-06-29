import express from 'express';
import morgan from 'morgan';
import authRoute from './routes/authentication'
import UsersRoute from './routes/user'
import produtctsRoute from './routes/products';
import categoryRoute from './routes/categories';
import database from './database'

import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(bodyParser.json({limit: '100mb'}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({
        text: 'welcome'
    });
});

app.use('/api/auth', authRoute);
app.use('/api/users', UsersRoute);
app.use('/api/products', produtctsRoute);
app.use('/api/categories', categoryRoute);



export default app;