const PoziviAjax = (()=>{

    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4 && xhttp.status == 200){
                fnCallback(null, JSON.parse(xhttp.responseText));
            }
            else if(xhttp.readyState == 4 && xhttp.status == 401){
                fnCallback(JSON.parse(xhttp.status, null));
            }
        }
        console.log("Pozoves li se ikad?");
        xhttp.open("GET", `http://localhost:8080/predmet/${naziv}`, true);
        xhttp.send();
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4 && xhttp.status == 200 && JSON.parse(xhttp.responseText).greska == null){
                fnCallback(null, JSON.parse(xhttp.responseText));
            }
            else if(xhttp.readyState == 4){
                fnCallback(JSON.parse(xhttp.responseText), null);
            }
        }
        xhttp.open("GET", "http://localhost:8080/predmeti", true);
        xhttp.send();
    }

    
    function impl_postLogin(username,password, fnCallback){
        const xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4){
                var result= JSON.parse(xhttp.responseText);
                if(result.poruka == "Uspješna prijava"){
                    fnCallback(null,JSON.parse(xhttp.responseText));
                }
                else if(JSON.parse(xhttp.responseText).poruka == "Neuspješna prijava"){
                    fnCallback(xhttp.status,JSON.parse(xhttp.responseText));
                }
            }
        };

        xhttp.open("POST", "http://localhost:8080/login", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({username:username.value,password:password.value}));
    }


    function impl_postLogout(fnCallback){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4 && xhttp.status == 200){
                fnCallback(null, xhttp.status);
                location.replace("http://localhost:8080"+xhttp.responseText);
            }
            else if(xhttp.readyState == 4 && xhttp.status == 401){
                fnCallback(xhttp.status, null);
            }
        }
        xhttp.open("POST", "http://localhost:8080/logout", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({poruka:"Hello and goodbye"}));
    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}

    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4 && xhttp.status == 200){
                fnCallback(null, JSON.parse(xhttp.responseText));
            }
            else if(xhttp.readyState == 4 && xhttp.status == 401){
                fnCallback(JSON.parse(xhttp.status, null));
            }
        }

        xhttp.open("POST", `http://localhost:8080/prisustvo/predmet/${naziv}/student/${index}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(prisustvo));
    }

    return{
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getPredmeti: impl_getPredmeti,
        getPredmet: impl_getPredmet,
        postPrisustvo: impl_postPrisustvo
    };
})();
