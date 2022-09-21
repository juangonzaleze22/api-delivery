import express from 'express';
import morgan from 'morgan';
import authRoute from './routes/authentication'
import UsersRoute from './routes/user'
import produtctsRoute from './routes/products';
import categoryRoute from './routes/categories';
import subcategoryRoute from './routes/subcategories';
import wishListRoute from './routes/wishlist';
import cscRoute from './routes/csc';

import database from './database'

import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true,limit: '50mb', parameterLimit: 50000 }));
app.use(cors());
app.options('*', cors());
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
app.use('/api/subcategories', subcategoryRoute);
app.use('/api/wishList', wishListRoute);
app.use('/api', cscRoute);





export default app;