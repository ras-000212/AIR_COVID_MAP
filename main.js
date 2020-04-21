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
	
	let btnQuality = document.createElement("button");
	btnQuality.setAttribute("id","btn-Quality");
	btnQuality.innerHTML ="Air quality";
	rootBal.appendChild(btnQuality);

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
	btnShow.setAttribute("type","button")
	btnShow.innerHTML ="afficher";
	formCovid.appendChild(btnShow);

	//form air-quality
	let formQuality = document.createElement('form');
	formQuality.setAttribute("id","form-quality");
	formQuality.style.display="none";
	rootBal.appendChild(formQuality);

	//dropdown coutries
	let selCountriesQua = document.createElement('select');
	selCountriesQua.setAttribute("id","countries-quality");
	formQuality.appendChild(selCountriesQua);
	

	btnCovid.addEventListener(`click`, function(){ 
		showFormCovid();
		if(formCovid.style.display=="none"){
			formCovid.style.display="block";
		}else{
			formCovid.style.display="none";
		}
	});

//get the dropdown value and call the getcountrystatus
	btnShow.addEventListener(`click`,function(){
		let ecountries = document.getElementById("countries-covid");
		let strCountries = ecountries.options[ecountries.selectedIndex].value;
		
		let eStatus = document.getElementById("status-covid");
		let strStatus = eStatus.options[eStatus.selectedIndex].value;
		console.log(strCountries+strStatus);
		let resultat = [];
		resultat = covid.get_country_status(strCountries,strStatus);
		console.log(resultat);
		google.showMap(resultat);
		
	})

	btnQuality.addEventListener('click', async function(){
		showFormQuality()
		if(formQuality.style.display=="none"){
			formQuality.style.display="block";
		}else{
			formQuality.style.display="none";
		}
		/*
		let states_air=[];
		let city_air=[];
		let city_states=[];
		
		/* bdd des régions de la bdd *//*
		states_air = await air.get_states_list()
		.then(result => {
			console.log(result.data);
			return result.data;
		});
		console.log(states_air);
		
		/* bdd des villes de la bdd */
		/*
		for (var i=0; i<states_air.length;i++){
			let city_air= await air.get_cities_list(states_air[i].state)
			.then(result => {
				return result.data;
			});
			city_states[i] = city_air;
		}
		console.log(city_states);
		
		/* bdd des informations des villes de la bdd *//*
		for (var i=0; i<states_air.length;i++){
				for (var j=0; j<city_states[i].length;j++){
					let city_air= await air.get_specified_city(city_states[i][j],states_air[i])
					.then(result => {
						console.log(result.data);
					});
			}
		}*/
	});
	

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
async function showFormQuality(){

	let dropdownCountries = document.getElementById('countries-quality');
	dropdownCountries.length = 0;
	let defaultOptionCountries = document.createElement('option');
	defaultOptionCountries.text = 'Choisissez le pays';

	dropdownCountries.add(defaultOptionCountries);
	dropdownCountries.selectedIndex = 0;
	
	let countries_list=[];
	countries_list = await air.get_countries_list()
	.then(result => {
			console.log(result.data);
	
			for(var i = 1; i <result.data.length;i++){
				option = document.createElement('option');
				option.text = result.data[i].country;
				option.value = result.data[i].country;
				dropdownCountries.add(option);
			}
		});
	
}
window.addEventListener("DOMContentLoaded", main);

