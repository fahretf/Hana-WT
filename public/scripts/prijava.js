function logIn(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    PoziviAjax.postLogin(username, password, function(err, data){
        if(err == null) {
            window.location.href = '/predmeti.html';
        }
        else {
            var div = document.getElementById("predmeti");
            div.innerHTML = data.poruka;
        }
    });
}

