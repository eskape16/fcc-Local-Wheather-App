var coordinates = [];
var pics = {
	hot: "https://static.pexels.com/photos/9568/summer-sun-yellow-photography.jpg",
	cold: "https://static.pexels.com/photos/29520/pexels-photo-29520.jpg",
	rain: "https://static.pexels.com/photos/31202/pexels-photo-31202.jpg",
	drizzle: "https://static.pexels.com/photos/94015/pexels-photo-94015.jpeg",
	clouds: "https://static.pexels.com/photos/87739/pexels-photo-87739.jpeg",
	snow: "https://static.pexels.com/photos/24475/pexels-photo-24475.jpg",
	clear: "https://static.pexels.com/photos/60696/leaves-blue-sky-summer-bright-day-60696.jpeg",
	fog: "https://static.pexels.com/photos/202008/pexels-photo-202008.jpeg",
	mist: "https://static.pexels.com/photos/249074/pexels-photo-249074.jpeg",
	thunder: "https://static.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg"
};

function getWeather() {
		var weather = "";
		var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&units=metric&APPID=a6157ed45e0627be062f2f6cfc793467';
		
		$.getJSON (url, function (data) {
			//console.log(data);
			
			//display temperature & description
			var tempCelsius = Math.round( data.main.temp)+" "+ "<span id='change'>°C</span>";
			var tempFahrenheit = Math.round(((data.main.temp)*9/5)+32)+" "+"<span id='change'>°F</span>";
			
			$(".tempCelsius").html(tempCelsius); 
			$(".tempFahrenheit").html(tempFahrenheit);
			$(".temperature").click(function(){
				$('.temperature').toggle();
			});
			$("#description").html(data.weather[0].description);
			
			//get & display weather icon
			var icon = data.weather[0].icon;
			var iconUrl = "http://openweathermap.org/img/w/"+icon+".png";
			$("#icon").html('<img src="'+iconUrl+'" alt="weather icon">');
			
			//set background picture depending on main weather
			var main = data.weather[0].main;
			main = main.toLowerCase();
			for (var name in pics) {
				if (main === name) { 
					//console.log (main, name, pics[name]);
					$("body").css({"background-image": "url('" + pics[name] +"')"})
				};
			};
		});
};
	

$(document).ready (function () {
	//get coordinates & display city
	//if https, redirect to http
	if (location.protocol === 'https:'){
		var msg = 'Oops! Seems like https is not supported... <br />Click <a target="_blank" href="http://codepen.io/irina_nova/full/ORGjOX/">here</a> for the plain old http version.';
		console.log(msg);
		$('.msg').html(msg);
	}
	var url = "http://ipinfo.io/json";
	
	$.getJSON (url, function(json) {
		//console.log(json);
		$('.city').html (json.city + ", " + json.country);
		var loc = json.loc;
		coordinates = (loc.split(","));
		getWeather();
	});
});
	

	
