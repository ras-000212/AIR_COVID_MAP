window.addEventListener("DOMContentLoaded",main);

var COVID_API = `https://api.covid19api.com/`;



function call(endpoint, requestOptions){
  return fetch(`${endpoint}`, requestOptions);
}
//Get casses of a country depends of the status(confirmed,recovered,deaths)
function get_country_status(country,status){
  var COVID_OPTION = `country/${country}/status/${status}`;
  var p = new Promise(function(resolve,reject){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    call(`${COVID_API}${COVID_OPTION}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        console.log(result.data[0])
      })


      .catch(error => console.log(`error`, error));
  })
}
  


function main(){
    var button = document.getElementById("b-covid");
    button.addEventListener(`click`, function(){  
        get_country_status(`france`,`confirmed`);
    })
} 


