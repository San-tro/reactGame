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
app.get('/items', (req, res) => {
    init_models(sequelize).Items.findAll({raw:true}).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    })
});

app.get('/leaderbord', (req, res) => {
    init_models(sequelize).LeaderBord.findAll({raw:true}).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    })
});

var ids = 0;
function getLustOP(){
    init_models(sequelize).LeaderBord.findOne({
        order: [ [ 'id', 'DESC' ]],  },).then(response => {
        ids = response.id;
    })
}
getLustOP();

app.post(
    '/leaderbord/add',(req,res)=>{
        ids++;
        init_models(sequelize).Orders_Progress.create({
            id: ids,
            name:req.body.Name,
            time:req.body.Time,
            score:req.body.Score,
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error);
        })
    }
);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});