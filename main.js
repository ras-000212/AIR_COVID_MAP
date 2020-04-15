var covid = require(`./covid-19.js`);
var air = require(`./air-quality.js`);
var google = require('./google_map.js');
require("regenerator-runtime/runtime");


function main(){

	let rootBal =document.getElementById("root");

	let btnCovid = document.createElement("button");
	btnCovid.setAttribute("id","btn-Covid");
	btnCovid.innerHTML ="COVID-19";
	rootBal.appendChild(btnCovid);


	//form Covid
	let formCovid = document.createElement('form');
	formCovid.setAttribute("id","form-covid");
	formCovid.style.display="none";
	rootBal.appendChild(formCovid);

	//dropdown coutries
	let selCountriesCov = document.createElement('select');
	selCountriesCov.setAttribute("id","countries-covid");
	formCovid.appendChild(selCountriesCov);

	//dropdown status
	let selStatusCov = document.createElement('select');
	selStatusCov.setAttribute("id","status-covid");
	formCovid.appendChild(selStatusCov);

	//button "afficher"
	let btnShow= document.createElement("button");
	btnShow.setAttribute("id","btn-Covid-show");
	btnShow.innerHTML ="afficher";
	formCovid.appendChild(btnShow);

	btnCovid.addEventListener(`click`, function(){ 
		showFormCovid();
		if(formCovid.style.display=="none"){
			formCovid.style.display="block";
		}else{
			formCovid.style.display="none";
		}
	});


	var button = document.getElementById("b-air");
	button.addEventListener('click', async function(){
		let states_air=[];
		let city_air=[];
		let city_states=[];
		
		/* bdd des régions de la bdd */
		states_air = await air.get_states_list()
		.then(result => {
			console.log(result.data);
			return result.data;
		});
		console.log(states_air);
		
		/* bdd des villes de la bdd */
		for (var i=0; i<states_air.length;i++){
			let city_air= await air.get_cities_list(states_air[i].state)
			.then(result => {
				return result.data;
			});
			city_states[i] = city_air;
		}
		console.log(city_states);
		
		/* bdd des villes de la bdd */
		for (var i=0; i<states_air.length;i++){
				for (var j=0; j<city_states[i].length;j++){
					let city_air= await air.get_specified_city(city_states[i][j],states_air[i])
					.then(result => {
						console.log(result.data);
					});
			}
		}
		
	});

	google.showMap();
	/*console.log(result.data);
	return result.data;*/


	//afficher marqueurs

};


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

function recupCountries(){



}


function formCovid(){

}

window.addEventListener("DOMContentLoaded", main);

