var covid = require(`./covid-19.js`);
var air = require(`./air-quality.js`);
var google = require('./google_map.js');


function main(){
	var button = document.getElementById("b-covid");
	button.addEventListener(`click`, function(){  
		showList();
	});

	var button = document.getElementById("b-air");
	button.addEventListener('click', function(){
		var state;
		state= air.get_states_list(state);
		//await get_cities_list(state)
	});

	google.initMap();
	
}

function showList(){
	let dropdown = document.getElementById('countries-covid');
	dropdown.length = 0;
	let defaultOption = document.createElement('option');
	defaultOption.text = 'Choisissez le pays';

	dropdown.add(defaultOption);
	dropdown.selectedIndex = 0;
	console.log(covid.getCountries().length);
	let countries= covid.getCountries();
	for(let i=0;i<countries.length;i++){
		option = document.createElement('option');
      	option.text = countries[i];
      	option.value = countries[i];
      	dropdown.add(option);
	}
}



function formCovid(){

}

window.addEventListener("DOMContentLoaded", main);

