var covid = require(`./covid-19.js`);
var air = require(`./air-quality.js`);

function main(){
	var button = document.getElementById("b-covid");
	button.addEventListener(`click`, function(){  
		covid.getCountries();
	});

	var button = document.getElementById("b-air");
	button.addEventListener('click', async function(){
		var state;
		state=await air.get_states_list(state);
		//await get_cities_list(state)
	});
}



function formCovid(){

}

window.addEventListener("DOMContentLoaded", main);

