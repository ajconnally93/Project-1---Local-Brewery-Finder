// ADD EVENT LISTENER HERE FOR FORM ON TOP OF PAGE
// SEND DATA TO JS FILE UPON CLICKING SUBMIT
// POPULATE DATA ON EACH LIST ITEM

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
            console.log(data);

            for (var i = 0; i < 5; i++) {

                document.getElementById("place" + [i]).textContent = data[i].name;

                // document.getElementById("panel" + [i] + "v").textContent = data[i].name;
                // document.getElementsByClassName("tabs-title").textContent = data[i].name;

                console.log(data[i].name);
            }
            // console.log(data[0].name);

            // Use For Loop to log 10 Airports through this pseudocode
            // console.log(data["Nearby Airports"][0].Airport)
            // data["Object Name"][#inObject].ObjectKey

            // have to use data inside this callback function (EX: appending to an HTML Element)
        })

}

// getApi ();