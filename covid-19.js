window.addEventListener("DOMContentLoaded",main);

var COVID_API = `https://api.covid19api.com/`



//Get casses of a country depends of the status(confirmed,recovered,deaths)
function get_country_status(country,status){
  COVID_OPTION = `country/${country}/status/${status}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  console.log(`${COVID_API}${COVID_OPTION}`)
  fetch(`${COVID_API}${COVID_OPTION}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log(`error`, error));
}

function main(){
    var button = document.getElementById("b-covid");
    button.addEventListener(`click`, function(){
        window.alert(`get_country_status`);
        get_country_status(`france`,`confirmed`);
    })
} 


