var baseUrl = 'https://www.googleapis.com/';
var API_key = 'AIzaSyC6IeWIYNrcXUMhTSy2XORDhQyboXO-atM';
const {Loader} = require('google-maps');


/* liste de villes exemples */
export var tMarker = [
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


export function showMap(){

  const loader = new Loader(API_key);
  
  loader.load().then(function (google) {
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.856667, lng: 2.350987},
      zoom: 8
    });

    createMarqueur(tMarker, map);

    //createMarqueur(tMarker, map);

    

    /*map.addListener(popup, "closeclick", function() {
      currentPopup = null;
    });*/
  });
}

/*export function recupCitiesTest(rootBal){


  for(var i = 0; i <tMarker.length; i++){
    
    //ajouter dans la liste déroulante...
    tMarker[i]=result[i].Country;
  }
  
  let listeTest = document.createElement('select');

	listeTest.setAttribute("id","countries-covid");
	rootBal.appendChild(listeTest);

}*/

export function createMarqueur(tab, map){
    var oLatLng, oMarker, data;
    var i, nb = tMarker.length;
   
    for( i = 0; i < nb; i++){
      data = tMarker[i];
      oLatLng = new google.maps.LatLng( data.lat, data.lon);
      oMarker = new google.maps.Marker({
        position : oLatLng,
        map : map,
        title : data.title
      });

      let popup = new google.maps.InfoWindow({
        content: "testtt",
        map : map,
        maxWidth: 300,
        maxHeight:100
      });

      attachSecretMessage(oMarker, "testtttt");

      /*google.maps.event.addListener(oMarker, "click", function() {
        if (currentPopup != null) {
          currentPopup.close();
          currentPopup = null;
  
        }
     
        popup.open(map, oMarker);
        currentPopup = popup;
      });

      google.maps.event.addListener(popup, "closeclick", function() {
        // On vide la variable
        currentPopup = null;
      });*/
    }
}


// Attaches an info window to a marker with the provided message. When the
// marker is clicked, the info window will open with the secret message.
function attachSecretMessage(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });

}

/*export function infoMarker(marker){

  let m = getElementById("map");

  m.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infoWindow.open(map, marker);
    }
  })(marker, i));

}*/

/*map.addListener(oMarker, 'click', (function(oMarker, i) {
        return function() {
            infoWindow.open(map, oMarker);
        }
      })(oMarker, i));
var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

map.addEventListener(oMarker, 'click', function() {
  infoWindow.open(map, oMarker);
})*/

/*oMarker.addEventListener("click", detectClickMarker(oMarker));

export function detectClickMarker(marker){
    marker.openInfoWindowHtml(
      '<strong>Testttt dedeyyy</strong>' +
      '<br /><p>Dedeyyyyyy</p>' +
      '<br /><a href="http://fr.wikipedia.org/wiki/Place_Bellecour">Voir l\'article sur Wikipedia (fr)</a>'
    );
}*/


      