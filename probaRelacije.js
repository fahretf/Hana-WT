const db = require('./baza.js')


function primjeriUpita(){
//    //lista knjiga ive andrica
//     // db.student.findOne({where:{ime:'Nezla Bisevac'}}).then(function(hana){
//     //     hana.getPrisustva().then(function(resSet){
//     //         console.log("Lista predmeta Hane za prvu sedmicu :");
//     //         resSet.forEach(element => {
//     //             console.log("Predmet "+element.predmet+" a ovo je sedmica "+element.sedmica);
//     //         });
//     //     });
//     // });

    db.student.findAll({where:{prisustvo:prisustvo}})
        // profa.getPredmeti().then(function(p){
        //     let list = [];
        //     p.forEach(element => {
        //       console.log("Ovo je predmet "+element.predmet); 
        //       list.push(element.predmet); 
        //     });
        //     console.log("Size: "+list.length);
        // })
  


 }

primjeriUpita();