const db = require('./baza.js');
db.sequelize.sync({force:true}).then(function(){
    inicializacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicializacija(){
    var profesor1, profesor2;
    var predmetListPromisea=[];
    var profesoriListaPromisea=[];
    var prisustvaListaPromisea=[];
    var studentiListaPromisea=[];
    return new Promise(function(resolve, reject){
        predmetListPromisea.push(db.predmet.create({predmet:'Tehnike programiranja', brojPredavanjaSedmicno:3, brojVjezbiSedmicno:2}));
        predmetListPromisea.push(db.predmet.create({predmet:'Razvoj mobilnih aplikacija', brojPredavanjaSedmicno:2,brojVjezbiSedmicno:2}));
        predmetListPromisea.push(db.predmet.create({predmet:'Web tehnologije', brojPredavanjaSedmicno:2,brojVjezbiSedmicno:2}));
        predmetListPromisea.push(db.predmet.create({predmet:'Uvod u programiranje', brojPredavanjaSedmicno:2,brojVjezbiSedmicno:2}));
        Promise.all(predmetListPromisea).then(function(predmeti){
            var tp=predmeti.filter(function(a){return a.predmet=='Tehnike programiranja'})[0];
            var rma=predmeti.filter(function(a){return a.predmet=='Razvoj mobilnih aplikacija'})[0];
            var wt=predmeti.filter(function(a){return a.predmet=='Web tehnologije'})[0];
            var uup=predmeti.filter(function(a){return a.predmet=='Uvod u programiranje'})[0];
            
            profesoriListaPromisea.push(
                db.nastavnik.create({username:'Profesor1', password_hash:'$2b$10$jlU3XhlhHv59cy.koVvbKeVQHfB4m6jdp.TORGxdrHCcnVZLQmN9S'})
                .then(function(k){
                    k.setPredmeti([rma, wt, tp]);
                    return new Promise(function(resolve, reject){return resolve(k);});
                })
            );

            profesoriListaPromisea.push(
                db.nastavnik.create({username:'Profesor2', password_hash:'$2a$12$xur/Q.5ofXGueQdDq3b9Juz2GDOjcYoOtQGZjLoqfA6584DVqgz0y'})
                .then(function(k){
                    k.setPredmeti([uup]);
                    return new Promise(function(resolve, reject){return resolve(k);});
                })
            );
            //rma
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:1,index:12345, predmet:'Razvoj mobilnih aplikacija'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:2,index:12346, predmet:'Razvoj mobilnih aplikacija'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:2,index:18628, predmet:'Razvoj mobilnih aplikacija'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:12345, predmet:'Razvoj mobilnih aplikacija'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:12346, predmet:'Razvoj mobilnih aplikacija'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:18628, predmet:'Razvoj mobilnih aplikacija'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:12346, predmet:'Razvoj mobilnih aplikacija'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:12345, predmet:'Razvoj mobilnih aplikacija'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:18628, predmet:'Razvoj mobilnih aplikacija'}));
           //wt
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:1,index:12345, predmet:'Web tehnologije'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:2,index:12346, predmet:'Web tehnologije'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:2,index:18628, predmet:'Web tehnologije'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:12345, predmet:'Web tehnologije'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:12346, predmet:'Web tehnologije'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:18628, predmet:'Web tehnologije'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:12346, predmet:'Web tehnologije'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:12345, predmet:'Web tehnologije'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:18628, predmet:'Web tehnologije'}));
            //tp
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:1,index:12345, predmet:'Tehnike programiranja'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:2,index:12346, predmet:'Tehnike programiranja'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:2,index:18628, predmet:'Tehnike programiranja'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:12345, predmet:'Tehnike programiranja'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:12346, predmet:'Tehnike programiranja'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:18628, predmet:'Tehnike programiranja'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:12346, predmet:'Tehnike programiranja'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:12345, predmet:'Tehnike programiranja'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:18628, predmet:'Tehnike programiranja'}));
            //uup
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:1,index:12345, predmet:'Uvod u programiranje'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:2,index:12346, predmet:'Uvod u programiranje'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:2,index:18628, predmet:'Uvod u programiranje'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:12345, predmet:'Uvod u programiranje'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:12346, predmet:'Uvod u programiranje'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2,index:18628, predmet:'Uvod u programiranje'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:12346, predmet:'Uvod u programiranje'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:12345, predmet:'Uvod u programiranje'}));
            prisustvaListaPromisea.push(db.prisustvo.create({sedmica:3,predavanja:2,vjezbe:2,index:18628, predmet:'Uvod u programiranje'}));
            Promise.all(prisustvaListaPromisea).then(function(prisustva){
                var s1 = prisustva.filter(function(a){return a.index == 12345});
                var s2 = prisustva.filter(function(a){return a.index == 12346});
                var s3 = prisustva.filter(function(a){return a.index == 18628});
                tp.setPrisustva(prisustva.filter(function(a){return a.predmet=='Tehnike programiranja'}));
                rma.setPrisustva(prisustva.filter(function(a){return a.predmet == 'Razvoj mobilnih aplikacija'}));
                uup.setPrisustva(prisustva.filter(function(a){return a.predmet == 'Uvod u programiranje'}));
                wt.setPrisustva(prisustva.filter(function(a){return a.predmet == 'Web tehnologije'}));
                studentiListaPromisea.push(db.student.create({ime: "Hana Bisevac", index:18628}).then(function(k){
                    k.setPrisustva(s3);
                    return new Promise(function(resolve, reject){return resolve(k)});
                }))
                studentiListaPromisea.push(db.student.create({ime: "Neko Nekic", index:12345}).then(function(k){
                    k.setPrisustva(s1);
                    return new Promise(function(resolve, reject){return resolve(k)});
                }));
                studentiListaPromisea.push(db.student.create({ime: "Nezla Bisevac", index:12346}).then(function(k){
                    k.setPrisustva(s2);
                    return new Promise(function(resolve, reject){return resolve(k)});
                }));
            })
        });
    })
}