const express = require('express');
const Sequelize = require("sequelize");
const sequelize = require('./baza.js');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const sessions = require("express-session")
const cookieParser = require("cookie-parser");
const fs=require('fs');
const s = require('./priprema.js');
const {Op, literal, fn} = require('sequelize');
const db={};

db.Sequelize = Sequelize;  

//import modela
db.nastavnik = require('./nastavnik.js') (sequelize);
db.student = require('./student.js') (sequelize);
db.predmet = require('./predmet.js') (sequelize);
db.prisustvo = require('./prisustvo.js') (sequelize);

db.student.hasMany(db.prisustvo,{as:'prisustva'});
db.predmet.hasMany(db.prisustvo, {as : 'prisustva'});
db.nastavnik.hasMany(db.predmet, {as: "predmeti"});

sequelize.sync().then(()=>{s.seeder(db)});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var session;

const direName = __dirname+'/public/html/';

app.use(express.static('public/html'));
app.use(express.static('public'));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret : 'my key',
    resave : false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay }
}))

app.use(cookieParser());


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
    let prisustvaLista = await predmet.getPrisustva();
    var listaIndexa  = [];
    let prisustva = [];
    prisustvaLista.map(x => {
        if(listaIndexa.indexOf(x.index) == -1) listaIndexa.push(x.index);
        prisustva.push({sedmica: x.sedmica, predavanja: x.predavanja, vjezbe: x.vjezbe, index: x.index, nazivPredmeta: x.predmet});
    })
    let listaStudenata = [];
    const student = await db.student.findAll();
    student.map(x => {
        if(listaIndexa.indexOf(x.index) > -1) listaStudenata.push({ime:x.ime, index:x.index});
    });
    let prisustvo = {predmet: nazivPredmeta, brojPredavanjaSedmicno: predmet.brojPredavanjaSedmicno, brojVjezbiSedmicno: predmet.brojVjezbiSedmicno, prisustva: prisustva, studenti: listaStudenata};
    res.send(JSON.stringify(prisustvo));
})


app.post('/prisustvo/predmet/:naziv/student/:index', async (req, res) => {
    let tijelo = req.body; //{sedmica, vjezbe, predavanja, index}
    let naziv = req.params.naziv;
    let indeks = req.params.index;
    var predmet = await db.predmet.findOne({where:{predmet:naziv}});
    var prisustvoExist = await db.prisustvo.findOne({where:{[Op.and]:[{nazivPredmeta: naziv}, {index:indeks}, {sedmica: tijelo.sedmica}]}});
    if(prisustvoExist == null){
        var studentId = await db.student.findOne({where:{index: indeks}});
        var novo = {sedmica: tijelo.sedmica, predavanja: tijelo.predavanja, vjezbe: tijelo.vjezbe, index: indeks, nazivPredmeta: naziv, studentId: studentId.id, predmetId: predmet.id}
        await db.prisustvo.create(novo);
    }
    const updateRows = await db.prisustvo.update({
        predavanja: tijelo.predavanja,
        vjezbe: tijelo.vjezbe
    },
    {
        where:{
        predmetId: predmet.id,
        index: indeks,
        sedmica: tijelo.sedmica
        }
    });
    console.log(updateRows);

    let prisustvaLista = await predmet.getPrisustva();
    var listaIndexa  = [];
    let prisustva = [];
    prisustvaLista.map(x => {
        if(listaIndexa.indexOf(x.index) == -1) listaIndexa.push(x.index);
        prisustva.push({sedmica: x.sedmica, predavanja: x.predavanja, vjezbe: x.vjezbe, index: x.index, nazivPredmeta: x.predmet});
    })
    let listaStudenata = [];
    const student = await db.student.findAll();
    student.map(x => {
        if(listaIndexa.indexOf(x.index) > -1) listaStudenata.push({ime:x.ime, index:x.index});
    });
    let prisustvo = {predmet: naziv, brojPredavanjaSedmicno: predmet.brojPredavanjaSedmicno, brojVjezbiSedmicno: predmet.brojVjezbiSedmicno, prisustva: prisustva, studenti: listaStudenata};
    res.send(JSON.stringify(prisustvo));
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