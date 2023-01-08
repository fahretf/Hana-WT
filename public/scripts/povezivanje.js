function logIn(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    PoziviAjax.postLogin(username, password, function(err, data){});
}

