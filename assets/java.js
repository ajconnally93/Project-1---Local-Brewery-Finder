function getApi () {
    // find fetch request URL that will give us a lot more data and a lot more AIRPORTS
    var requestUrl = 'https://api.flightapi.io/nearby/634748ba2985d74fecfb407d?country=US&token=dHA9MCNsb2M9MzUxNTQyMTkjbG5nPTMzI3BsPTIjhfjdsfk5MzQxI2xicz0xNDoxNjcwNTczMQ==';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Use For Loop to log 10 Airports through this pseudocode
            // console.log(data["Nearby Airports"][0].Airport)
            // data["Object Name"][#inObject].ObjectKey

            // have to use data inside this callback function (EX: appending to an HTML Element)
        })

}

getApi ();