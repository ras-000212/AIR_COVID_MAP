window.addEventListener("DOMContentLoaded",main);
var baseUrl = 'https://www.googleapis.com/';
var API_key = 'AIzaSyC6IeWIYNrcXUMhTSy2XORDhQyboXO-atM&callback=initMap';

function main(){ //à modifier...
    var button = document.getElementById("b-map");
    button.addEventListener('click', async function(){
		await show_map()
    });  
}

function call(endpoint, requestOptions) {
	return fetch(`${baseUrl}${endpoint}&key=${API_key}`, requestOptions)
}

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}
 
    