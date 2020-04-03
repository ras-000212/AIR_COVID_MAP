
var baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.airvisual.com/v2/';
var token = 'fb68fe36-52f3-44b7-9bc1-5106057100fc';


function call(endpoint, requestOptions) {
	return fetch(`${baseUrl}${endpoint}&key=${token}`, requestOptions)
}

export function get_states_list(){
		const myList = document.querySelector('ul');
		var requestOptions = {
		  method: 'GET',
		  redirect: 'follow'
		};
		
		var p =call("states?country=France", requestOptions)
		  .then(response => response.json())
		  .catch(error => console.log('error', error))
		  
		return p;  
}
 
export function get_city_list(state){
		const myList = document.querySelector('ul');
		var requestOptions = {
		  method: 'GET',
		  redirect: 'follow'
		};
		
		var p =call("cities?state= &country=France", requestOptions)
		  .then(response => response.json())
		  .catch(error => console.log('error', error))
		  
		return p;  
}    