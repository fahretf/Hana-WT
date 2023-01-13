const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const sessions = require("express-session")
const cookieParser = require("cookie-parser");
const fs=require('fs');
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var session;
//app.use(express.json());
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

//rute
app.get('/prisustvo.html', (req, res)=>{
    res.sendFile(path.join(direName+'prisustvo.html'));
});

app.get('/prijava.html', (req, res)=>{
    res.sendFile(path.join(direName+'prijava.html'))
});

app.get('/predmeti.html', (req, res)=>{
    res.sendFile(path.join(direName+'predmeti.html'));
})


//servis
app.get('/predmeti', (req, res)=>{
    if(session != null) {
        res.send(session.predmeti);
    }
    else{
        res.send({greska: "Nastavnik nije loginovan"});
    }
})

app.get('/predmet/:naziv', (req, res)=>{
    fs.readFile(__dirname+'/public/data/prisustva.json', function(err, data){
        let nazivPredmeta = req.params.naziv;
        const obj = JSON.parse(data);
        for(var i in obj){
            if(obj[i].predmet == nazivPredmeta){
                res.send(JSON.stringify(obj[i]));
            }
        }
    })
})


app.post('/prisustvo/predmet/:naziv/student/:index', (req, res) => {
    fs.readFile(__dirname+'/public/data/prisustva.json', function(err, data){
        let tijelo = req.body;
        let naziv = req.params.naziv;
        let indeks = req.params.index;
        var obj = JSON.parse(data);
        console.log("OBJEKAT JE STAA "+ obj[0].predmet);
        for(i in obj){
            if(obj[i].predmet == naziv){
                var prisustva = obj[i].prisustva;
                var usao = 0;
                for(let j in prisustva){
                    if(prisustva[j].index == indeks && tijelo.sedmica == prisustva[j].sedmica){
                        console.log("Ovo smo poslali treba biti 1 "+tijelo.predavanja);
                        obj[i].prisustva[j].predavanja = tijelo.predavanja;
                        obj[i].prisustva[j].vjezbe = tijelo.vjezbe;
                        usao=1;
                        break; 
                    }
                }
                if(usao) break;
            }
        }
        var newData = JSON.stringify(obj);
        console.log("NOVA DATA "+newData);
        fs.writeFile(__dirname+'/public/data/prisustva.json', newData, function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("JSON file has been saved.");
        });
        res.send(JSON.stringify(obj));
    });
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
                var list = [];
                for(var o in obj[i].predmeti){
                    list.push(obj[i].predmeti[o]);
                }
                session = req.session;
                session.predmeti = list;
                bcrypt.hash(pass, 10, function(err, hash) {
                    if(bcrypt.compareSync(tijelo.password, hash)) {
                        session.username = tijelo.username;
                        res.send({"poruka":"Uspješna prijava"});
                    }
                    else{ 
                        session = null;
                        res.send({"poruka":"Neuspješna prijava"})
                    }
                });
            }
        }
        if(usernameGreska) {
            session = null;
            res.send({"poruka":"Neuspješna prijava"})
        }
    });
    
})

app.post('/logout', (req, res)=>{
    session = null;
    res.send('/prijava.html')
})

app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));