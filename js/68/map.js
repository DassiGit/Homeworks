/* global google*/

const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker"); 
const { Map, InfoWindow } = await google.maps.importLibrary('maps');
const Esther136 = {lat: 43.79882393907977, lng:-79.44122000512534};
let markers = [];

const map = new Map(document.getElementById('map'), {
        center: Esther136,
        zoom: 8,
        renderingType: 'VECTOR',
        mapTypeId: 'satellite',
        mapId: 'Demo_Map_Id'
    });

    
    const search = document.querySelector('#searchTerm');
    

    const searchBut = document.querySelector('#searButton').addEventListener('click', () =>{
        const searchTerm = search.value;
        loadInfo(searchTerm);
        
    });

  
    async function loadInfo(searchTerm) {
         const geoNomesUrl = `http://api.geonames.org/wikipediaSearch?q=${searchTerm}&maxRows=10&username=speedyspeller&type=json`;
   
         try{
            document.querySelector('#errorMessage').textContent = '';
            document.querySelector('#resultsList').innerHTML = '';
            markers.forEach(marker => marker.map = null);
markers = [];
    const geoResponse = await fetch(geoNomesUrl);
    if (!geoResponse.ok) {
    throw new Error('Could not load search results');
}
const geoData = await geoResponse.json();
    console.log(geoData.geonames);
    if (geoData.geonames.length > 0) {
    const firstPlace = geoData.geonames[0];

    map.setCenter({
        lat: firstPlace.lat,
        lng: firstPlace.lng
    });

    map.setZoom(10);
}


   geoData.geonames.forEach((place) => {
       const geoPosition = {
      
    lat: place.lat,
    lng: place.lng
    }  
  const listItem = document.createElement('li');
listItem.textContent = place.title;

const marker = new AdvancedMarkerElement({
        map,
        position: geoPosition,
    });
const infoWind = new InfoWindow();
listItem.addEventListener('click', () => {
    map.setCenter(geoPosition);
    map.setZoom(12);

    infoWind.setContent(`
        <div style="width: 220px;">
            <h3>${place.title}</h3>
            <p>${place.summary.substring(0, 150)}...</p>
            <a href="${place.wikipediaUrl}" target="_blank">Read more on Wikipedia</a>
        </div>
    `);

    infoWind.open({
        anchor: marker,
        map: map
    });
});

document.querySelector('#resultsList').appendChild(listItem);
   
    markers.push(marker);
 
    marker.addEventListener('mouseenter', () =>{
infoWind.setContent(`
    <div style="width: 220px;">
        <h3>${place.title}</h3>
        <p>${place.summary.substring(0, 150)}...</p>
        <a href="${place.wikipediaUrl}" target="_blank">Read more on Wikipedia</a>
    </div>
`);
    infoWind.open({
    anchor: marker
});
});

document.querySelector('#sidebar').style.display = 'block';
document.querySelector('#input').style.display = 'none';

marker.addEventListener('mouseleave', () => {
    infoWind.close();
});

}
    )}catch (error) {
    console.log(error);
    document.querySelector('#errorMessage').textContent =
        'Oops! Something went wrong. Please try again.';
}
    }


    
    document.querySelector('#sidebarSearchButton').addEventListener('click', () =>{
        const sidebarSearchTerm = document.querySelector("#sidebarSearchTerm");
        loadInfo(sidebarSearchTerm.value);
    })
    