const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

var cities = JSON.parse(fs.readFileSync('cities.json', 'utf8'));

app.listen(port, () => console.log("Server Started on Port " + port));

app.post('/api/login', (req, res, next) => {
    
    let userData = {
        username: req.body.username,
        password: req.body.password
    };

    console.log("**********************************");
    console.log("User Name : " + userData.username);
    console.log("Password : " + userData.password);
    console.log("**********************************");

    if(userData.username == "onurbilke" && userData.password == "123456") {
        res.status(200).json({code: 1, message: "Login Successful"});
    }
    else {
        res.status(401).json({code: 0, message: 'Login Failed'});
    }
});

app.get('/api/time', function(req, res, next) 
{
    var date = new Date();
    res.status(200).json({code: 1, message: date});
});

app.get('/api/query', function(req, res, next) 
{
    var id = req.query.id;
    res.status(200).json({code: 1, message: "Id : " + id});
});

app.get('/api/cities', function(req, res, next)
{
    var data = {"cities" : cities};
    res.status(200).json({code: 1, data: data});
});

app.get('/', (req, res) => {
    res.send("Server Started on Port " + port);
});