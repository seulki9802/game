const express = require('express');
const app = express();

// app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use('/public', express.static(__dirname + '/public'));



app.listen(8888, function*(){
    console.log('listening on 8888')
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})