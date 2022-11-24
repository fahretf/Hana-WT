
export let TabelaPrisustvo = function (divRef, podaci) {

    divRef.innerHTML = "";

    //{studenti: [{ime:"Neko",index:12345}], 
    //prisustva:[{sedmica:1,predavanja:1,vjezbe:1,index:12345}], 
    //predmet:"WT", brojPredavanjaSedmicno:3, brojVjezbiSedmicno:2}
    //validacija
    var validni = 1;

    //Broj prisustva na predavanju/vježbi je veći od broja predavanja/vježbi sedmično
    //Broj prisustva je manji od nule
    for(let i=0; i<podaci.prisustva.length; i++){
        if(podaci.prisustva[i].predavanja > podaci.brojPredavanjaSedmicno || podaci.prisustva[i].vjezbe>podaci.brojVjezbiSedmicno) validni = 0;
        else if(podaci.prisustva[i].predavanja < 0 || podaci.prisustva[i].vjezbe < 0) validni = 0; 
    }
    //console.log("Prva validacija "+validni);

    //Isti student ima dva ili više unosa prisustva za istu sedmicu
    for(let i=0; i<podaci.prisustva.length; i++){
        var indeks = podaci.prisustva[i].indeks;
        var s = podaci.prisustva[i].sedmica;
        for(let j=i+1; j<podaci.prisustva.length; j++){
            if(podaci.prisustva[j].index == indeks && podaci.prisustva[j].sedmica == s) validni = 0;
        }
    }
    //console.log("2. validacija "+validni);

    //Postoje dva ili više studenata sa istim indeksom u listi studenata
    for(let i=0; i<podaci.studenti.length; i++){
        var indeks = podaci.studenti[i].index;
        var nasao = 0;
        for(let j=0; j<podaci.studenti.length; j++){
            if(indeks == podaci.studenti[j].index) nasao = 1;
        }
        if(!nasao) validni = 0;
    }
    //console.log("3. validacija "+validni);

    //Postoji prisustvo za studenta koji nije u listi studenata
    for(let i=0; i<podaci.prisustva.length; i++){
        var nasao = 0;
        var student = podaci.prisustva[i].index;
        for(let j=0; j<podaci.studenti.length; j++){
            if(podaci.studenti[j].index == student){
                nasao=1;
                break;
            }
        }
        if(!nasao) validni =0;
    }
    //console.log("4. validacija "+validni);

    //Postoji sedmica, između dvije sedmice za koje je uneseno prisustvo bar jednom studentu, u kojoj nema unesenog prisustva. Npr. uneseno je prisustvo za sedmice 1 i 3 ali nijedan student nema prisustvo za sedmicu 2
    var lista = new Array();
    for(let i=0; i<podaci.prisustva.length; i++){
        lista.push(podaci.prisustva[i].sedmica);
    }
    var listaHelper = new Array();
    for(let i=0; i<lista.length; i++){
        if(listaHelper.indexOf(lista[i]) === -1) listaHelper.push(lista[i]);
    }
    var prvi = listaHelper[0];
    for(let i=1; i<listaHelper.length; i++){
        if(listaHelper[i] - 1 != prvi){
            validni = 0 ;
            break;
        }
        prvi++;
        
    }
    //console.log("5. validacija "+validni);

    if(validni == 0){
        const naslov = document.createElement("h1");
        const textNaslova = document.createTextNode("Podaci o prisustvu nisu validni");
        naslov.appendChild(textNaslova);
        divRef.appendChild(naslov);
        return;
    }

    const naslov = document.createElement("h1");
    const textNaslova = document.createTextNode("Naziv predmeta: "+podaci.predmet);
    naslov.appendChild(textNaslova);
    divRef.appendChild(naslov);
    
    var ukupnoPredavanja = podaci.brojPredavanjaSedmicno;
    var ukupnoVjezbi = podaci.brojVjezbiSedmicno;
    const newTable = document.createElement("table");
    const tbl = document.createElement("tbody");

    //var keyName = Object.keys(podaci);
    var br=podaci.prisustva.length;
    for(let i=0; i<podaci.prisustva.length; i++){
        var prva=i;
        for(let j=i+1; j<podaci.prisustva.length; j++){
            if(podaci.prisustva[prva].sedmica == podaci.prisustva[j].sedmica) br--;
        }
    }

    var kolone = 2 + br+1;

    for(let i=0; i<1; i++){
        const row = document.createElement("tr");
        var k = 1;
        for(let j=0; j<kolone; j++){
            if(j==0){
                const cell = document.createElement("td");
                const cellText = document.createTextNode("Ime i prezime");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if(j==1){
                const cell = document.createElement("td");
                const cellText = document.createTextNode("Index");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (j== kolone-1){
                const cell = document.createElement("td");
                var broj = 15-k;
                const cellText = document.createTextNode(k+"-"+broj);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else{
                const cell = document.createElement("td");
                var text;
                if(k == 1) text = "I";
                else if(k == 2) text = "II";
                else if(k == 3) text = "III";
                else if(k == 4) text="IV";
                else if(k == 5) text="V";
                else if(k == 6) text="VI";
                else text="VII";
                const cellText = document.createTextNode(text);
                cell.appendChild(cellText);
                row.appendChild(cell);
                k++;
            }
        }
        tbl.appendChild(row)
   }

   
    var k = 0;
    for(let i=0; i<podaci.studenti.length; i++){
        const row = document.createElement("tr");
        var indeks = podaci.studenti[k].index;
        var s = 1;
        for(let j=0; j<kolone; j++){
            if(j==0){
                const cell = document.createElement("td");
                const cellText = document.createTextNode(podaci.studenti[k].ime);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if(j==1){   
                const cell = document.createElement("td");
                const cellText = document.createTextNode(podaci.studenti[k].index);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if(j<kolone-2){
                const cell = document.createElement("td");
                var brPredavanja = 0;
                var brVjezbi = 0;
                for(let l =0; l<podaci.prisustva.length; l++){
                    if(s == podaci.prisustva[l].sedmica){
                        if(podaci.prisustva[l].index == indeks){
                            brPredavanja = podaci.prisustva[l].predavanja;
                            brVjezbi = podaci.prisustva[l].vjezbe;
                            break;
                        }
                    }
                }
                var ukupno;
                if(brPredavanja==0 && brVjezbi==0) ukupno = 0;
                else ukupno = (brPredavanja+brVjezbi)/(ukupnoPredavanja+ukupnoVjezbi) *100;
                const cellText = document.createTextNode(ukupno+"%");
                cell.appendChild(cellText);
                row.appendChild(cell);
                s++;
            }
            else if(j==kolone-2){
                var ukupnoPrisustvo=0;
                var usao = 0;
                for(let m=0; m<podaci.prisustva.length; m++){
                    if(s==podaci.prisustva[m].sedmica){
                        if(podaci.prisustva[m].index == indeks){
                            ukupnoPrisustvo = podaci.prisustva[m].predavanja+podaci.prisustva[m].vjezbe;
                            usao=1;
                            break;
                        }
                    }
                }
                for(let m=0; m<2; m++){
                    const row2 = document.createElement("tr");
                    for(let l=0; l<ukupnoPredavanja; l++){
                        if(m==0){
                            const cell = document.createElement("td");
                            var broj = l+1;
                            const cellText = document.createTextNode("P"+broj);
                            cell.appendChild(cellText);
                            row2.appendChild(cell);
                        }
                        else{
                            const cell = document.createElement("td");
                            const cellText = document.createTextNode("");
                            if(ukupnoPrisustvo>0) cell.style.background = "rgb(148,196,124)";
                            else if(!usao) cell.style.background = "white";
                            else cell.style.background = "rgb(232,100,100)";
                            ukupnoPrisustvo--;
                            cell.appendChild(cellText);
                            row2.appendChild(cell);
                        }
                        
                    }
                    for(let l=0; l<ukupnoVjezbi; l++){
                        if(m==0){
                            const cell = document.createElement("td");
                            var broj = l+1;
                            const cellText = document.createTextNode("V"+broj);
                            cell.appendChild(cellText);
                            row2.appendChild(cell);
                        }
                        else{
                            const cell = document.createElement("td");
                            const cellText = document.createTextNode("");
                            cell.appendChild(cellText);
                            if(ukupnoPrisustvo>0) cell.style.background = "rgb(148,196,124)";
                            else if(!usao) cell.style.background = "white";
                            else cell.style.background = "rgb(232,100,100)";
                            ukupnoPrisustvo--;
                            row2.appendChild(cell);
                        }
                    }
                    row2.style.width = "10px";
                    row.appendChild(row2);
                }
                
            }
            else{
                const cell = document.createElement("td");
                const cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
                
        }
        tbl.appendChild(row)
        k++;
    }
    newTable.appendChild(tbl);
    divRef.appendChild(newTable);
    newTable.setAttribute("border", "2");

    // console.log('Ovo je neki student ' + podaci.studenti[0].ime);


    //implementacija metoda
    // let sljedecaSedmica = function () {

    // }

    // let prethodnaSedmica = function () {

    // }


    // return {
    //     sljedecaSedmica: sljedecaSedmica,
    //     prethodnaSedmica: prethodnaSedmica
    // }
}