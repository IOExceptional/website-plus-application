/**
 * Created by lee on 02/02/2016.
 */

var express = require('express'),
    app = express();

app.use('/assets/', express.static(__dirname + '/www/assets'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

app.get('/application/', function (req, res) {
    res.sendFile(__dirname + '/www/app.html');
});

app.listen(8080);
