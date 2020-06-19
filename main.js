var covid = require(`./covid-19.js`);
var air = require(`./air-quality.js`);
var google = require('./google_map.js');
require("regenerator-runtime/runtime");


function main(){
	let results_airquality = document.getElementById("results_airquality");
	
	//deviendra inutile...
	results_airquality.style.display ="none";
	
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

	//button "afficher" COVID
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
	
	//dropdown states
	let selStatesQua = document.createElement('select');
	selStatesQua.setAttribute("id","states-quality");
	formQuality.appendChild(selStatesQua);
	
	//dropdown city
	let selCitiesQua = document.createElement('select');
	selCitiesQua.setAttribute("id","cities-quality");
	formQuality.appendChild(selCitiesQua);
	
	//table result creation
	let table_airquality = document.createElement('table');
	table_airquality.setAttribute("id","table-quality");
	table_airquality.setAttribute("border", "1");
	table_airquality.setAttribute("style", "width:100%");
	let t_values = document.createElement('tr');
	t_values.setAttribute("id", "qualityTITLE");
	table_airquality.appendChild(t_values);

	//creation column 
	let titles = ['Temps','Température', 'Humidité', 'Vent', 'Pression', 'Taux de qualité de l air'];
	for(i=0; i<titles.length; i++){
		let c1 = document.createElement('td');
		let name = "c" + i;
		c1.setAttribute("id", name);
		let t = titles[i];
		let valText = document.createTextNode(t);
		c1.appendChild(valText);
		t_values.appendChild(c1);
	}
	

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
		if(formQuality.style.display=="none"){
			showFormQuality()
			formQuality.style.display="block";
			results_airquality.style.display ="block";
		}else{
			formQuality.style.display="none";
			results_airquality.style.display ="none";
		}
	});

	selCountriesQua.addEventListener('change', async function(){
		
		let dropdownCountries = document.getElementById('countries-quality');
		let country = dropdownCountries.options[dropdownCountries.selectedIndex].value;
		console.log(country);
		
		/*prepare dropdownStates */
		let dropDownStates = document.getElementById("states-quality");
		dropDownStates.length = 0;
		let defaultOptionStates = document.createElement('option');
		defaultOptionStates.text = 'Choisissez la region';
		dropDownStates.add(defaultOptionStates);
		dropDownStates.selectedIndex = 0;
		
		/*call api air quality to get states list */
		let states_list=[];
		states_list = await air.get_states_list(country)
		.then(result => {
			console.log(result.data);
			for(var i = 0; i <result.data.length;i++){
				option = document.createElement('option');
				option.text = result.data[i].state;
				option.value = result.data[i].state;
				dropDownStates.add(option);
			}
		});
		
	});

	selStatesQua.addEventListener('change', async function(){
		/*recover parameters for API */
		let dropdownCountries = document.getElementById('countries-quality');
		let country = dropdownCountries.options[dropdownCountries.selectedIndex].value;
		let dropDownStates = document.getElementById('states-quality');
		let state = dropDownStates.options[dropDownStates.selectedIndex].value;
		console.log(country);
		console.log(state);
		
		/*prepare dropdownCities */
		let dropDownCities = document.getElementById("cities-quality");
		dropDownCities.length = 0;
		let defaultOptionCity = document.createElement('option');
		defaultOptionCity.text = 'Choisissez la ville';
		dropDownCities.add(defaultOptionCity);
		dropDownCities.selectedIndex = 0;
		
		/*call api air quality to get cities list */
		await air.get_cities_list(country,state)
		.then(result => {
			console.log(result.data);
			for(var i = 0; i <result.data.length;i++){
				option = document.createElement('option');
				option.text = result.data[i].city;
				option.value = result.data[i].city;
				dropDownCities.add(option);
			}
		});
	});
	

	selCitiesQua.addEventListener('change',async function(){
		/*recover parameters for API */
		let dropdownCountries = document.getElementById('countries-quality');
		let country = dropdownCountries.options[dropdownCountries.selectedIndex].value;
		let dropDownStates = document.getElementById('states-quality');
		let state = dropDownStates.options[dropDownStates.selectedIndex].value;
		let dropDownCities = document.getElementById('cities-quality');
		let city = dropDownCities.options[dropDownCities.selectedIndex].value;
		
		console.log(country);
		console.log(state);
		console.log(city);
		
		//creation button show
		let btnShowQuality = document.createElement('button');
		btnShowQuality.setAttribute("id", "btnShowQuality");
		btnShowQuality.setAttribute("type","button")
		btnShowQuality.innerHTML ="Afficher";
		formQuality.appendChild(btnShowQuality);

		btnShowQuality.addEventListener('click',async function(){

			/*we add the table */
			results_airquality.appendChild(table_airquality);
			formQuality.style.display = "none";
			btnShowQuality.remove();
			
			/*call api air quality to get information of the city */
			await air.get_specified_city(country,state, city)
			.then(result => {
				console.log(result.data);
				
				//creation of a new row
				var newRow = document.createElement("tr");
				table_airquality.appendChild(newRow);
				
				//Temps : sun, rain
				var col1 = document.createElement("td");
				var img = document.createElement("IMG");
				var icone = result.data.current.weather.ic;
				console.log(icone);
				console.log(`/`+icone+`.png`);
				//console.log(getNameImage(icone),icone);
				var contenu =`/`+icone+`.png`;
				img.setAttribute("src",contenu);
				col1.appendChild(img); //doesn't work, don't see the image
				newRow.appendChild(col1);
				
				//Temperature
				var col2 = document.createElement("td");
				var text2 = document.createTextNode(result.data.current.weather.tp);
				col2.appendChild(text2);
				newRow.appendChild(col2);
				
				//Humidity
				var col3 = document.createElement("td");
				var text3 = document.createTextNode(result.data.current.weather.hu);
				col3.appendChild(text3);
				newRow.appendChild(col3);
				
				//Wind
				var col4 = document.createElement("td");
				var text4 = document.createTextNode(result.data.current.weather.wd);
				col4.appendChild(text4);
				newRow.appendChild(col4);
				
				//Pressure
				var col5 = document.createElement("td");
				var text5 = document.createTextNode(result.data.current.weather.pr);
				col5.appendChild(text5);
				newRow.appendChild(col5);
				
				//AQI
				var col6 = document.createElement("td");
				var text6 = document.createTextNode(result.data.current.pollution.aqicn);
				col6.appendChild(text6);
				newRow.appendChild(col6);
				
				//google map

				let r = [];
				r[0] = result.data.location.coordinates[0];
				r[1] = result.data.location.coordinates[1];
				r[2] = country;
				r[3] = state;
				r[4] = city;
				console.log(r);
				google.showMapQuality(r);

				//doesn't work 
				/*here.insertHTMLSRC();
				here.showHereMap();*/
				/*add marqueurs */
				//result.data.location.coordinate[0], [1]
				
			});
	
		})
		
		
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

