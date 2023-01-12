function getPredmet(element){
    PoziviAjax.getPredmet(element, function(err, data){
        let div = document.getElementById('predmet');
        TabelaPrisustvo(div, data);
    })
}

let callBack = function(err, data){
    console.log("Udjes li ovdje?")
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
    if(err != null) div.innerHTML = data.greska;
}



function getPredmeti(){
    PoziviAjax.getPredmeti(callBack);
}

window.onload = (event) => {
    getPredmeti();
  };

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  


function logOut(){
    PoziviAjax.postLogout(function(err, data){});
}