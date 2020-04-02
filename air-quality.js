
var baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.airvisual.com/v2/';
var token = 'fb68fe36-52f3-44b7-9bc1-5106057100fc';


function call(endpoint, requestOptions) {
	return fetch(`${baseUrl}${endpoint}&key=${token}`, requestOptions)
}

export function get_states_list(state){
	var p = new Promise(function(resolve, reject){
		const myList = document.querySelector('ul');
		var requestOptions = {
		  method: 'GET',
		  redirect: 'follow'
		};
		
		call("states?country=France", requestOptions)
		  .then(response => response.json())
		  .then(result => {
				console.log(result);
				console.log(result.data);
				// crée un nouvel élément div
				var newDiv = document.createElement("div");
				// et lui donne un peu de contenu
				state = result.data[0].state;
				var newContent = document.createTextNode(state);
				// ajoute le nœud texte au nouveau div créé
				newDiv.appendChild(newContent);
				  
				// ajoute le nouvel élément créé et son contenu dans le DOM
				var currentDiv = document.getElementById('div1');
				  
				document.body.insertBefore(newDiv, currentDiv);
		  })
		  .catch(error => console.log('error', error))
		  
	});	
}
 
    