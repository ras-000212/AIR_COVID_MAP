var COVID_API = `https://api.covid19api.com/`;

//Get casses of a country depends of the status(confirmed,recovered,deaths)
export function get_country_status(country,status){
  
  let resres = [];
  var COVID_OPTION = `country/${country}/status/${status}`;
  console.log(COVID_OPTION);
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };

  resres = fetch(`${COVID_API}${COVID_OPTION}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        let cases = [];
        for(var i = 0;i<result.length;i++){
          cases[i] = {"lat" : result[i].Lat,
          "lon": result[i].Lon,
          "cases":result[i].Cases,
          "date":result[i].Date};
        }
        console.log(cases);
        return cases;

      })
    .catch(error => console.log(`error`, error));
  return resres;
}


//use this for the drowpdown list
export function getCountries(){
  let countries=[];
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  return fetch("https://api.covid19api.com/countries", requestOptions)
    .then(response => response.json())
    .then(result => {
      for(var i = 1; i <result.length;i++){
        countries[i]=result[i].Country;
      }
      return countries;
    })
    .catch(error => console.log('error', error));
} 






export default {
	baseURL: COVID_API,
	function : get_country_status()
};





