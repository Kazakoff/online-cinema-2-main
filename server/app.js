const admin = require('firebase-admin')
const express = require('express')
const { Router } = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = Router();

const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL,
});

const PORT = +process.env.PORT || 5000;

const app = express()

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000'],
        optionsSuccessStatus: 200,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/delete_user', (req, res) => {
    admin
        .auth()
        .deleteUser(...Object.keys(req.body))
        .then(() => {
            admin
                .firestore()
                .collection('users')
                .doc(...Object.keys(req.body))
                .delete()
        })
        .catch((error) => {
            console.log(error);
        })
});

app.listen(PORT, () => { console.log(`App listening on port ${PORT}`) });