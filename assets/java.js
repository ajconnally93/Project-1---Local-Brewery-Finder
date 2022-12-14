var cityForm = document.getElementById("cityForm");

function submitData (event) {
    event.preventDefault();
    var userCity = document.getElementById("cname").value;
    getApi (userCity);
}

cityForm.addEventListener("submit", submitData);

function getApi (userCity) {
    var requestUrl = 'https://api.openbrewerydb.org/breweries?by_city=' + userCity + '&per_page=5';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // This for loop grabs HTML ID's by name & number[i], and adds text content based on the arrays of Data pulled from the Brewery API
            for (var i = 0; i < 5; i++) {

                document.getElementById("place" + [i]).textContent = data[i].name;

                if (document.getElementById("address" + [i]).textContent = data[i].street == null) {
                    document.getElementById("address" + [i]).textContent = "No address available :(";
                } else {
                    document.getElementById("address" + [i]).textContent = 'Address: ' + data[i].street + ', ' + data[i].city + ', ' + data[i].state;
                }

                if (document.getElementById("phone" + [i]).textContent = data[i].street == null) {
                    document.getElementById("phone" + [i]).textContent = "No phone number available :(";
                } else {
                    document.getElementById("phone" + [i]).textContent = 'Phone: ' + data[i].phone;
                }

                if (document.getElementById("type" + [i]).textContent = data[i].street == null) {
                    document.getElementById("type" + [i]).textContent = "Brewery type unavailable :(";
                } else {
                    document.getElementById("type" + [i]).textContent = "Brewery type: " + data[i].brewery_type;
                }
                //when the data is loading then it will check for a map value of "latitude" which if null then will not load map but skip to the next i
                if (data[i].latitude==null){
                    document.getElementById("map" + [i]).innerHTML="Map Not Available";
                } else {
                    let nLatitude = data[i].latitude;
                    let nLongitude = data[i].longitude;
                    mapboxgl.accessToken = 'pk.eyJ1IjoibWltaWxvdmVzY29kaW5nIiwiYSI6ImNsOTliYjR6ODF3OHgzb3FtejFmNzN1ZnEifQ.wcXaCrnlX1FTlPxTV2Ueow';
                    const map = new mapboxgl.Map({
                        container: 'map'+i, // container ID
                        attributionControl:false,
                        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                        style: 'mapbox://styles/mapbox/streets-v11', // style URL
                        center: [nLongitude,nLatitude], // starting position [lng, lat]
                    zoom: 15, // starting zoom to ensure user can see the map location close-up
                        projection: 'globe' // display the map as a 3D globe
                    });
                    
                    map.on('style.load', () => {
                        map.setFog({}); // Set the default atmosphere style
                    });
                }
            }
        })
}


// Allows us to set multiple items under the same key in localStorage as an array
var cname = document.getElementById('cname');
var citySearched = localStorage.getItem("citySearched");
var citySearchedArray = citySearched?JSON.parse(citySearched):[];
function searchedCity () {
    var citySearchedValue = cname.value;
    citySearchedArray.push(citySearchedValue);
    localStorage.setItem("citySearched", JSON.stringify(citySearchedArray));
    citySearched = localStorage.getItem("citySearched");
    citySearchedArray = JSON.parse(citySearched);
}

var olEl = document.getElementById("recentSearches");
function renderCity () {
    for (var i = 0; i < citySearchedArray.length; i++) {
        var liTag = document.createElement('span');
        if (i != 0) {
            liTag.textContent = ', ' + citySearchedArray[i];
        } else {
            liTag.textContent = citySearchedArray[i];
        }
        olEl.appendChild(liTag);
    }
}

cityForm = document.getElementById('cityForm');
cityForm.addEventListener("submit", searchedCity);

renderCity ();