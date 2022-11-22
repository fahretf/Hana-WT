
export let TabelaPrisustvo = function (divRef, podaci) {

    divRef.innerHTML = "";

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

    var kolone = 2 + br;

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
            else if(j!=kolone-1){
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
            else if(j==kolone-1){
                var ukupnoPrisustvo=0;
                for(let m=0; m<podaci.prisustva.length; m++){
                    if(s==podaci.prisustva[m].sedmica){
                        if(podaci.prisustva[m].index == indeks){
                            ukupnoPrisustvo = podaci.prisustva[m].predavanja+podaci.prisustva[m].vjezbe;
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
                            else cell.style.background = "rgb(232,100,100)";
                            ukupnoPrisustvo--;
                            row2.appendChild(cell);
                        }
                    }
                    row2.style.width = "10px";
                    row.appendChild(row2);
                }
                
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