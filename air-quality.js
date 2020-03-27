window.addEventListener("DOMContentLoaded",main);

function main(){
    var button = document.getElementById("b-covid");
    button.addEventListener('click', function(){
        window.alert("teeeeeeeeeeest");
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://api.covid19api.com/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    });
}