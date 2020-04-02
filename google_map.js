var baseUrl = 'https://www.googleapis.com/';
var API_key = 'AIzaSyC6IeWIYNrcXUMhTSy2XORDhQyboXO-atM&callback=initMap';

function main(){ //à modifier...
    var button = document.getElementById("b-map");
    button.addEventListener('click', async function(){
		await show_map()
    });  
}

var tMarker = [
    { lat : 44.837368,
      lon : -0.576144,
      title : 'Bordeaux'
    },
    { lat :45.767299,
      lon : 4.834329,
      title : 'Lyon'
    },
    {lat :43.297612,
     lon : 5.381042,
     title : 'Marseille'
    },
    {
      lat : 48.856667,
      lon :  2.350987,
      title : 'Paris'
    }
];


  //pas besoins à vérifier...
function call(endpoint, requestOptions) {
	return fetch(`${baseUrl}${endpoint}&key=${API_key}`, requestOptions)
}

var map;
export function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });

    createMarqueur(tMarker, map);
}
 
function createMarqueur( tab, map){
    var oLatLng, oMarker, data;
    var i, nb = tab.length;
   
    for( i = 0; i < nb; i++){
      data = tab[i];
      oLatLng = new google.maps.LatLng( data.lat, data.lon);
      oMarker = new google.maps.Marker({
        position : oLatLng,
        map : map,
        title : data.title
      });
    }
}
    