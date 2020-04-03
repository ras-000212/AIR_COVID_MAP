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
	button.addEventListener('click', async function(){
		let states_air=[];
		let city_air=[];
		let city_states=[];
		console.log("test");
		
		states_air = await air.get_states_list()
		.then(result => {
			console.log(result.data);
			return result.data;
		});

		console.log(states_air);
		for (var i=0; i<states_air.length;i++){
			let city_air= await air.get_cities_list(states_air[i].state)
			.then(result => {
				return result.data;
			});
			city_states[i] = city_air;
		}
		console.log(city_states);
	});

	google.initMap();
	
}

//voir avec le prof comment on fait pour ne pas mettre ça la
function showFormCovid(){

	let dropdownCountries = document.getElementById('countries-covid');
	dropdownCountries.length = 0;
	let defaultOptionCountries = document.createElement('option');
	defaultOptionCountries.text = 'Choisissez le pays';

	dropdownCountries.add(defaultOptionCountries);
	dropdownCountries.selectedIndex = 0;

	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	  };
	  
	  fetch("https://api.covid19api.com/countries", requestOptions)
		.then(response => response.json())
		.then(result => {
		  for(var i = 1; i <result.length;i++){
			option = document.createElement('option');
			option.text = result[i].Country;
		  	option.value = result[i].Country;
			dropdownCountries.add(option);
		  }
		})
		.catch(error => console.log('error', error));

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

