const express = require('express');
const app = express();
const port = 3001;
const init_models = require('./models/init-models');
const sequelize = require("./models/dbConnection");
const { QueryTypes } = require('sequelize');


app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});


app.get('/landscape', (req, res) => {
    init_models(sequelize).Landscape.findAll({raw:true}).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    })

});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});