const PoziviAjax = (()=>{

    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    // function impl_getPredmet(naziv,fnCallback){

    // }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){

    }

    
//fnCallback
    function impl_postLogin(username,password, fnCallback){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState==4 && xhttp.status == 200){
                sessionStorage.setItem("nastavnik", username.value);
                fnCallback(null,JSON.parse(xhttp.responseText));
                console.log(JSON.parse(xhttp.responseText));
            }
            else if(xhttp.readyState == 4 && xhttp.status == 401){
                fnCallback(xhttp.status,JSON.parse(xhttp.responseText));
                console.log(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open("POST", "http://localhost:3000/login", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({username:username.value,password:password.value}));
    }


    // function impl_postLogout(fnCallback){

    // }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    // function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){

    // }

    return{
        postLogin: impl_postLogin,
        //postLogout: impl_postLogout,
        //getPredmet: impl_getPredmet,
        getPredmeti: impl_getPredmeti
        //postPrisustvo: impl_postPrisustvo
    };
})();