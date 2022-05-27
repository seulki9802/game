require('dotenv').config()

const { response } = require('express');
const express = require('express');
const app = express();

// app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/react-game/build'));


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'ejs');


const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect(process.env.DB_URL, function(error, client){
    if(error) return console.log(error)

    db = client.db('game');
    app.listen(process.env.PORT, function(){
            console.log('listening on ' + process.env.PORT);
    });
})

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/react-game/build/index.html');
});

app.post('/update', function(req, res){

    var score = {
        name : req.body.name,
        score : parseInt(req.body.score),
    }

    db.collection('ranking').insertOne(score, function(error){
        if (error) return res.sendStatus(400);
        res.sendStatus(200);
    })

})

app.post('/ranking', function(req, res) {
    db.collection('ranking').find().sort( { "score" : -1 } ).limit(10).toArray(function(error, result){
        if (error) return res.sendStatus(400);
        res.send(result)
    })
})