const express = require('express');
const baza = require('./baza.js');
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

const {predmet} = require('./baza.js');
const {student} = require('./baza.js');
const {nastavnik} = require('./baza.js');
const {prisustvo} = require('./baza.js');
const db = require('./baza.js');
const { stringify } = require('querystring');
const { promisify } = require('util');
const { Z_ASCII } = require('zlib');
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

app.get('/predmet.html', (req, res)=>{
    res.sendFile(path.join(direName+'predmet.html'));
})


//servis
app.get('/predmeti', (req, res)=>{
    if(session != null) {
        res.send(session.predmeti);
    }
    else{
        res.send(JSON.stringify({greska: "Nastavnik nije loginovan"}));
    }
})


app.get('/predmet/:naziv', async (req, res)=>{
    let nazivPredmeta = req.params.naziv;
    const predmet = await db.predmet.findOne({where:{predmet: nazivPredmeta}});
    let prisustva = await predmet.getPrisustva();
    let listaStudenata = [];
    prisustva.forEach(x =>{
        var item = db.student.findOne({where: {id:x.studentId}});
        if(listaStudenata.indexOf(item) == -1) listaStudenata.push(item);
    });
    console.log('RETARDE BUDI POZITIVAN '+listaStudenata.length);
    listaStudenata.forEach(x=>console.log("Lista studenata "+x.ime));
    //console.loge("Ovo je "+listaStudenata[0].ime);
    // prisustva.prisustva = await predmet.getPrisustva().then(await function(n){
    //     var lista = [];
    //     n.forEach(x => lista.push(x));
    //     return lista;
    // });
    // prisustva.predmet = predmet.naziv;
    // prisustva.brojPredavanjaSedmicno = predmet.brojPredavanjaSedmicno;
    // prisustva.brojVjezbiSedmicno = predmet.brojVjezbiSedmicno;
    // fs.readFile(__dirname+'/public/data/prisustva.json', function(err, data){
    //     let nazivPredmeta = req.params.naziv;
    //     const obj = JSON.parse(data);
    //     for(var i in obj){
    //         if(obj[i].predmet == nazivPredmeta){
    //             res.send(JSON.stringify(obj[i]));
    //         }
    //     }
    // })
})


app.post('/prisustvo/predmet/:naziv/student/:index', (req, res) => {
    fs.readFile(__dirname+'/public/data/prisustva.json', function(err, data){
        let tijelo = req.body;
        let naziv = req.params.naziv;
        let indeks = req.params.index;
        var obj = JSON.parse(data);
        console.log("OBJEKAT JE STAA "+ obj[0].predmet);
        var usao = 0;
        for(i in obj){
            if(obj[i].predmet == naziv){
                var prisustva = obj[i].prisustva;
                for(let j in prisustva){
                    if(prisustva[j].index == indeks && tijelo.sedmica == prisustva[j].sedmica){
                        obj[i].prisustva[j].predavanja = tijelo.predavanja;
                        obj[i].prisustva[j].vjezbe = tijelo.vjezbe;
                        usao=1;
                        break; 
                    }
                }
                if(usao) break;
                else{
                    obj[i].prisustva.push({sedmica: tijelo.sedmica,predavanja: tijelo.predavanja,vjezbe:tijelo.vjezbe,index:indeks});
                    break;
                }
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


app.post('/login', async (req, res)=>{
    let tijelo = req.body;
    let profesor = await db.nastavnik.findOne({where:{username:tijelo.username}});
    if(profesor == null){
        res.send({"poruka":"Neuspješna prijava"})
    }
    else{
        let pass=profesor.password_hash;
        if(bcrypt.compareSync(tijelo.password, pass)) {
            session = req.session;
            session.username = tijelo.username;
            let lista = await profesor.getPredmeti().then(await function(p){
                var l = [];
                p.forEach(x => { l.push(x.predmet)})
                return l;
            });
            session.predmeti = lista;
            res.send({"poruka":"Uspješna prijava"});
        }
        else{ 
            session = null;
            res.send({"poruka":"Neuspješna prijava"})
        }
    }
    
});

    


app.post('/logout', (req, res)=>{
    session = null;
    res.send('/prijava.html')
})

app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));