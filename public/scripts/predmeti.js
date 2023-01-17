function getPredmet(element){
    PoziviAjax.getPredmet(element, function(err, data){
        let div = document.getElementById('predmet');
        TabelaPrisustvo(div, data);
    })
}

let callBack = function(err, data){
    var p = document.getElementById('poruka');
    if(err == null){
        p.innerHTML = "Uspješna prijava";
        var ul = document.createElement('ul');
        ul.setAttribute('id','proList');
        document.getElementById('nastavnikPredmeti').appendChild(ul);
        data.forEach(renderData);
        function renderData(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class','item');
            ul.appendChild(li);
            li.innerHTML=li.innerHTML + element;
            li.addEventListener('click', function(){
            getPredmet(element);
            })
        }
    }
    else {
        p.innerHTML = err.greska;
        var btn = document.getElementById('btn');
        btn.innerHTML = "Nazad";
    }
}

function getPredmeti(){
    PoziviAjax.getPredmeti(callBack);
}

window.onload = (event) => {
    getPredmeti();
  };

function logOut(){
    PoziviAjax.postLogout(function(err, data){});
}