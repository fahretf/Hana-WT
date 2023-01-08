function logIn(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    PoziviAjax.postLogin(username, password, function(err, data){
        if(err == null) getPredmeti();
        else {
            var div = document.getElementById("predmeti");
            div.innerHTML = data.poruka;
        }
    });
}

function getPredmeti(){
    PoziviAjax.getPredmeti(function(err, data){
        var div = document.getElementById("predmeti");
        if(err != null) div.innerHTML = data.greska;
        
    });
}

function logOut(){
    PoziviAjax.postLogout(function(err, data){});
}

