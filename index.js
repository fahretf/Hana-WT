const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const sessions = require("express-session")
const cookieParser = require("cookie-parser");
const fs=require('fs');
const { Console } = require('console');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var session;
app.use(express.json());
app.use(express.static(__dirname));

const direName = __dirname+'/public/html/';

app.use(express.static('public'));
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret : 'my key',
    resave : false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay }
}))

app.use(cookieParser());

app.get('/predmet', (req, res)=>{
    res.sendFile(path.join(direName+'predmet.html'));
});

app.get('/prisustvo', (req, res)=>{
    res.sendFile(path.join(direName+'prisustvo.html'));
});

app.get('/prijava', (req, res)=>{
    res.sendFile(path.join(direName+'prijava.html'))
});
app.get('/predmeti', (req, res)=>{
    //session = req.session;
    if(session.username) {
        console.log("Udjes li ovdje sreco "+session.username);
        res.sendFile(path.join(direName+'predmeti.html'));
    }
    else console.log("Okej je");
})



app.post('/login', (req, res)=>{
    fs.readFile(__dirname+'/public/data/nastavnici.json', function(error, data){
        let tijelo = req.body;
        var usernameGreska = true;
        if(error){
            return console.log(error);
        }
        const obj = JSON.parse(data);
        for(var i in obj){
            if(obj[i].nastavnik.username == tijelo.username){
                usernameGreska = false;
                var pass = obj[i].nastavnik.password_hash;
                bcrypt.hash(pass, 10, function(err, hash) {
                    if(bcrypt.compareSync(tijelo.password, hash)) {
                        res.send({"poruka":"Uspješna prijava"});
                        session = req.session;
                        session.username = tijelo.username;
                        session.list = obj[i].predmeti;
                        console.log("Sta je ba ovo? "+session.username);
                    }
                    else{ 
                        res.send({"poruka":"Neuspješna prijava"})
                    }
                });
            }
        }
        if(usernameGreska) res.send({"poruka":"Neuspješna prijava"})
    });
    
})

app.post('/logout', (req, res)=>{
    session.destroy();
    res.send('/prijava');
})

app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));