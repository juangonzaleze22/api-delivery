import dotenv from "dotenv";
dotenv.config()

export default {
    SECRECT: 'secret_ecommerce',
    AppConfig: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
    }
}