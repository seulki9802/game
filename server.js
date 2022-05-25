require('dotenv').config()

const express = require('express');
const app = express();

// app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect(process.env.DB_URL, function(error, client){
    if(error) return console.log(error)

    db = client.db('game');
    app.listen(process.env.PORT, function(){
            console.log('listening on ' + process.env.PORT);
    });
})