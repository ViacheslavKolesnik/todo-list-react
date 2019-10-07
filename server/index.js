const Utils = require("./scripts/utils");

const express = require('express');
const fs = require('fs');
var bodyParser = require("body-parser");

const app = express()
const port = 3002
const userDataPath = "userData"
const userFilePath = userDataPath + "/{}";
const userFileExtension = ".json";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    })
    next();
})

app.get('/get-user-data', (request, response) => {
    let file = userFilePath.replace("{}", request.query.user) + userFileExtension;
    let userData = undefined;

    try {
        userData = JSON.parse(fs.readFileSync(file));
    } catch (error) {
        console.log("Cannot find file for getting user data: " + file);
        response.sendStatus(400);
        return;
    }

    if (Utils.validateUserData(userData)) {
        response.status(200).send(userData);
    } else {
        console.log("Invalid user data while getting user data.");
        console.log(JSON.stringify(userData));
        response.sendStatus(500);
    }
})

app.get('/check-user-data-exists', (request, response) => {
    let file = userFilePath.replace("{}", request.query.user) + userFileExtension;
    let userData = undefined;

    try {
        userData = JSON.parse(fs.readFileSync(file));
    } catch (error) {
        console.log("Cannot find file for checking user data: " + file);
        response.sendStatus(400);
        return;
    }

    if (Utils.validateUserData(userData)) {
        response.sendStatus(200);
    } else {
        console.log("Invalid user data while checking user data.");
        console.log(JSON.stringify(userData));
        response.sendStatus(500);
    }
})

app.get('/get-users', (request, response) => {
    let userFiles = fs.readdirSync(userDataPath);
    let users = [];

    userFiles.forEach((file) => {
        let userData = JSON.parse(fs.readFileSync(userFilePath.replace("{}", file)));

        if (Utils.validateUserData(userData)) {
            users.push(
                {
                    name: userData.name,
                    email: userData.email
                }
            );
        } else {
            console.log("Invalid user data while getting users.");
            console.log(JSON.stringify(userData));
        }
    });

    response.status(200).send(JSON.stringify(users));
})

app.post('/save-user-data', (request, response) => {
    let userData = request.body.userData;

    if (Utils.validateUserData(userData)) {
        try {
            fs.writeFileSync(userFilePath.replace("{}", Utils.getFileName(userData)) + userFileExtension, JSON.stringify(userData), (err) => {
                console.log(err);
                response.status(500).send(err);
            });

            response.sendStatus(200);
        } catch (err) {
            console.log(err);
            response.status(500).send(err);
        }
    } else {
        console.log("Invalid user data while saving.");
        console.log(JSON.stringify(userData));
        response.sendStatus(400);
    }
})

app.post('/save-user', (request, response) => {
    let user = request.body.user;

    if (Utils.validateUser(user)) {
        try {
            let userData = user;
            user.notes = []

            fs.writeFileSync(userFilePath.replace("{}", Utils.getFileName(userData)) + userFileExtension, JSON.stringify(userData), (err) => {
                console.log(err);
                response.status(500).send(err);
            });

            response.sendStatus(200);
        } catch (err) {
            console.log(err);
            response.status(500).send(err);
        }
    } else {
        console.log("Invalid user while saving.");
        console.log(JSON.stringify(user));
        response.sendStatus(400);
    }
})

app.delete('/remove-user', (request, response) => {
    let user = request.body.user;

    try {
        fs.unlinkSync(userFilePath.replace("{}", Utils.getFileName(user)) + userFileExtension, (err) => {
            console.log(err);
            response.status(500).send(err);
        });

        response.sendStatus(200);
    } catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
})