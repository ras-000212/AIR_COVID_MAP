/*core (mapsjs-core.js);
service (mapsjs-service.js);*/

// Instantiate (and display) a map object:


export function insertHTMLSRC(){

    let x = document.createElement('script');
    x.setAttribute("src", "https://js.api.here.com/v3/3.1/mapsjs-core.js");
    x.setAttribute("type", "text/javascript");
    x.setAttribute("charset", "utf-8");
    x.setAttribute("crossorigin", "anonymous");

    let y = document.createElement('script');
    y.setAttribute("src", "https://js.api.here.com/v3/3.1/mapsjs-service.js");
    y.setAttribute("type", "text/javascript");
    y.setAttribute("charset", "utf-8");
    y.setAttribute("crossorigin", "anonymous");

    let doc = document.getElementById("root");
    doc.appendChild(x);
    doc.appendChild(y);

}

export async function showHereMap(){

    
    var platform = new H.service.Platform({
        'apikey': '{bMPSDvbSWUmOCy-dZyygO5LsT-Un34dsKOxhNpSC5Ko}'
    });

    var defaultLayers = platform.createDefaultLayers();

    var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
        zoom: 10,
        center: { lat: 52.5, lng: 13.4 }
    });

}
/*<script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" type="text/javascript" charset="utf-8"></script>
<script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>*/
