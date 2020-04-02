var covid = require(`./covid-19.js`);

function main(){
	var button = document.getElementById("b-covid");
	button.addEventListener(`click`, function(){  
		covid.getCountries();
	});

	var button = document.getElementById("b-air");
	button.addEventListener('click', async function(){
		var state = await get_states_list()
		await get_cities_list(state)
	});
}



function formCovid(){

}

window.addEventListener("DOMContentLoaded", main);

