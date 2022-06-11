import express from 'express'
import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
import routes from './routes'
import dbConnection from './utils/dbConnection'
import cors from 'cors'

const app = express()
const APP_PORT = 3200
const APP_HOST = 'localhost'

app.use(urlencoded({ extended: true }));
app.use(json())
app.use(cors())
app.use(cookieParser())
app.use('/api', routes)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

dbConnection()
    .then(() => {
        app.listen(APP_PORT, APP_HOST, () => {
            console.log("User Server started");
        });
    }).catch(() => {
        console.log("Error in DB connection")
    })
    .catch(e => console.log(e))