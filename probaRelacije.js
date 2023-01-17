const db = require('./baza.js')
const { Op, literal, fn } = require('sequelize');


async function primjeriUpita(){
    // let predmet = await db.predmet.findOne({where:{predmet: 'Web tehnologije'}});
    // let prisustvaLista =  await predmet.getPrisustva();
    // let listaIndexa = [];
    // let prisustva = [];
    // prisustvaLista.map(x => {
    //     if(listaIndexa.indexOf(x.index) == -1) listaIndexa.push(x.index);
    //     prisustva.push({sedmica: x.sedmica, predavanja: x.predavanja, vjezbe: x.vjezbe, index: x.index, predmet: x.predmet});
    // })
    // let listaStudenata = [];
    // const student = await db.student.findAll();
    // student.map(x => {
    //     if(listaIndexa.indexOf(x.index) > -1) listaStudenata.push({ime:x.ime, index:x.index});
    // })
    // let prisustvo = {predmet: predmet.naziv, brojPredavanjaSedmicno: predmet.brojPredavanjaSedmicno, brojVjezbiSedmicno: predmet.brojVjezbiSedmicno, prisustva: prisustva, studenti: listaStudenata};
    
    var predmet = await db.predmet.findOne({where:{predmet:'Tehnike programiranja'}});
    var prisustva = await db.prisustvo.findOne({where:{[Op.and]:[{predmetId: predmet.id}, {index:18628}, {sedmica: 1}]}});
    //{sedmica, vjezbe, predavanja, index} 
    //console.log(prisustvo);
    // let prisustvo = null;
    // prisustva.map(x => {
    //     if(x.index == 18628 && x.sedmica === 1) prisustvo = {sedmica : x.sedmica, vjezbe : x.vjezbe, predavanja : x.predavanja, index: x.index, nazivPredmeta: x.nazivPredmeta}; 
    // });
    const updateRows = db.prisustvo.update({
        predavanja: 1,
        vjezbe: 1
    },
    {
        where:{
        predmetId: predmet.id,
        index: 18628,
        sedmica: 1
        }
    })
    console.log(updateRows);


 }

primjeriUpita();