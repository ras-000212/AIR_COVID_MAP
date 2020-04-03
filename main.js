var covid = require(`./covid-19.js`);
var air = require(`./air-quality.js`);
var google = require('./google_map.js');
require("regenerator-runtime/runtime");


function main(){

	document.getElementById('form-covid').style.display="none";
	var button = document.getElementById("b-covid");
	button.addEventListener(`click`, function(){ 
		showFormCovid();
		if(document.getElementById('form-covid').style.display=="none"){
		document.getElementById('form-covid').style.display="block";
		}else{
			document.getElementById('form-covid').style.display="none";
		}
	});

	var button = document.getElementById("b-air");
	button.addEventListener('click', function(){
		air.get_states_list()
		.then(result => {
			
		})
		console.log(state);
		//await get_cities_list(state)
	});

	google.initMap();
	
}

//voir avec le prof comment on fait pour ne pas mettre ça la
async function showFormCovid(){

	let dropdownCountries = document.getElementById('countries-covid');
	dropdownCountries.length = 0;
	let defaultOptionCountries = document.createElement('option');
	defaultOptionCountries.text = 'Choisissez le pays';

	dropdownCountries.add(defaultOptionCountries);
	dropdownCountries.selectedIndex = 0;

		let countries = await covid.getCountries();
		for(var i = 1; i <countries.length;i++){
			option = document.createElement('option');
			option.text = countries[i];
		  	option.value = countries[i];
			dropdownCountries.add(option);
		}

		let dropdownStatus = document.getElementById('status-covid');
		dropdownStatus.length = 0;
		let defaultOptionCovid = document.createElement('option');
		defaultOptionCovid.text = "Choisissez l\'état";
	
		dropdownStatus.add(defaultOptionCovid);
		dropdownStatus.selectedIndex = 0;

		var status = ["confirmed","death","recovered"];
		console.log(status);
		for(var i = 0; i <status.length;i++){
			console.log(status[i])
			option = document.createElement('option');
			option.text = status[i];
		  	option.value = status[i];
			dropdownStatus.add(option);
		  }
		
}



function formCovid(){

}

window.addEventListener("DOMContentLoaded", main);