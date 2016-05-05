
var places = [
	{
		address : "208 S. Akard st, Dallas, TX",
		lat: "32.7797583",
		lng: "-96.7990691",
		title: "Ivory Tower",
	},
	{
		address : "8687 N Central Expressway, Suite 2340, NorthPark Center, Dallas, TX",
		lat: "32.8669116",
		lng: "-96.7748551",
		title: "North Park"
	},
	{
		address : "2305 W I-20, Suite 100, Grand Prairie, TX",
		lat: "32.675085",
		lng: "-97.038484",
		title: "Grand Prairie"
	},
	{
		address : "1971 U.S. 287 Frontage Rd Ste. 113, Mansfield, TX",
		lat: "32.595490",
		lng: "-97.147949",
		title: "Mansfield"
	},
	{
		address : "13710 Dallas Pkwy, Dallas, TX",
		lat: "32.933534",
		lng: "-96.820745",
		title: "Galleria"
	}
];	

var Location = function(data) {
	this.address = ko.observable(data.address);
};
//creates global map variable
var map;


var ViewModel = function() {

	var self = this;
	
	self.locationList = ko.observableArray([]);

	//THE MAP
	//initializes the map
	map = new google.maps.Map(document.querySelector('#map'), {
		center: {lat: 32.820351, lng: -97.0122201},
		zoom: 10,
		disableDefaultUI: true
	});

	

//FUNCTIONS: handleThis, pushThis, and markerClick; these functions were
//created outside the for loop to store the variables marker and infoWindow
//makes it possible to display and click the correct marker.  
//got this idea from the Udacity discussion board and expanded on it
	var lastInfoWindow = null;
	this.handleThis = function(marker, infoWindow) {
		function toggleBounce() {
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function(){marker.setAnimation(null); }, 1900);
			setLocation(marker);    
		};

		return function() {
			
			if (lastInfoWindow === infoWindow) {
	          toggleBounce(marker);
	          infoWindow.close(map, this);
	          lastInfoWindow = null;
	        }
	        else {
	            	if(lastInfoWindow !== null) {
	                	lastInfoWindow.close(map, this);
	                	toggleBounce(marker);
	            	}
	        	toggleBounce(marker);    	
	            infoWindow.open(map, this);
	            lastInfoWindow = infoWindow;
	        }	
		};

	};

	//pushes the markers into the locationList ko.observable array
	var pushThis = function(marker) {
		locationList.push(marker);
	};

	//animates the correct marker and opens the info window
	this.markerClick = function(marker) {
		google.maps.event.trigger(marker, 'click', marker);
		setLocation(marker);
	};

	//iterates through the places array and creates the markers
	for (var i = 0; i < places.length; i++) {
		var latLng = new google.maps.LatLng(places[i].lat, places[i].lng);
		self.marker = new google.maps.Marker({
			address: places[i].address,
			position: latLng,
			map: map,
			title: places[i].title
		});
		self.infoWindow = new google.maps.InfoWindow({
		    content: places[i].title
		});
		
		google.maps.event.addListener(marker, 'click', handleThis(marker, infoWindow));
		pushThis(marker);
		
	};
	

	//displays the address at the bottom of the locations list
	this.currentLocation = ko.observable();
	this.setLocation = function(clickedLocation) {
		self.currentLocation(clickedLocation);
	};

};

ko.applyBindings(ViewModel());
