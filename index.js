const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fs=require('fs');
const { Console } = require('console');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const direName = __dirname+'/public/html/';

app.use(express.static('public'));

app.get('/predmet', (req, res)=>{
    res.sendFile(path.join(direName+'predmet.html'));
});

app.get('/prisustvo', (req, res)=>{
    res.sendFile(path.join(direName+'prisustvo.html'));
});

app.get('/prijava', (req, res)=>{
    res.sendFile(path.join(direName+'prijava.html'))
});

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
                console.log("Ovo je pass "+pass);
                console.log("Ovo je moj "+tijelo.password);
                bcrypt.hash(pass, 10, function(err, hash) {
                    if(bcrypt.compareSync(tijelo.password, hash)) {
                        res.send({"poruka":"Uspješna prijava"});
                    }
                    else{
                        res.send({"poruka": "Neuspješna prijava"})}
                });
            }
        }
        if(usernameGreska) res.send({"poruka": "Neuspješna prijava"})
    });
    
})

app.get('/predmeti', (req, res)=>{
    
})


app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));