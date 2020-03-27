window.addEventListener("DOMContentLoaded",main);
var baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.airvisual.com/v2/';
var token = 'fb68fe36-52f3-44b7-9bc1-5106057100fc';

 function main(){
    var button = document.getElementById("b-air");
    button.addEventListener('click', async function(){
		await get_states_list()
     });  
}

function call(endpoint, requestOptions) {
	return fetch(`${baseUrl}${endpoint}&key=${token}`, requestOptions)
}

function get_states_list(){
	var p = new Promise(function(resolve, reject){

		var requestOptions = {
		  method: 'GET',
		  redirect: 'follow'
		};
		
		call("states?country=France", requestOptions)
		  .then(response => response.text())
		  .then(result => console.log(result))
		  .catch(error => console.log('error', error));
	});	
}
 
    