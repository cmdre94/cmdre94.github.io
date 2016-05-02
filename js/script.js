
var places = [
	{
		address : "208 S. Akard st, Dallas, TX",
		lat: "32.7795514",
		lng: "-96.7995402",
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
		lat: "32.6749862",
		lng: "-97.0406846",
		title: "Grand Prairie"
	},
	{
		address : "1971 U.S. 287 Frontage Rd Ste. 113, Mansfield, TX",
		lat: "32.5949679",
		lng: "-97.1490089",
		title: "Mansfield"
	},
	{
		address : "13710 Dallas Pkwy, Dallas, TX",
		lat: "32.9340412",
		lng: "-96.8228905",
		title: "Galleria"
	}
];	

//will delete this location function if I get thiw to work without it
/*var Location = function(data) {
	this.address = ko.observable(data.address);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.title = ko.observable(data.title);
}*/


//creates global map variable
var map;




var ViewModel = function() {

	var self = this;
	
	self.locationList = ko.observableArray([]);

	// will delete lines 56 through 58 if I get this to work without them
	/*places.forEach(function(locationItem){
		self.locationList.push( new Location(locationItem) );
	});*/

	//THE MAP
	//initializes the map
	map = new google.maps.Map(document.querySelector('#map'), {
		center: {lat: 32.820351, lng: -97.0122201},
		zoom: 10,
		disableDefaultUI: true
	});

	var lastInfoWindow = null;

//FUNCTIONS: handleThis, pushThis, and markerClick; these functions were
//created outside the for loop to store the variables Marker and InfoWindow
//makes it possible to display and click the correct marker.  
//got this idea from the discussion board and expanded on it
	this.handleThis = function(marker, infoWindow) {
		function toggleBounce() {

			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function(){marker.setAnimation(null); }, 1900);
				    
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
		this.currentLocation = ko.observable();
	};

	//animates the marker but does not open the infowindow
	this.markerClick = function(marker, infoWindow) {

		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){marker.setAnimation(null); }, 1900);
		infoWindow.open(map, this);
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
		var infoWindow = new google.maps.InfoWindow({
		    content: places[i].title
		});
		

		google.maps.event.addListener(marker, 'click', handleThis(marker, infoWindow));
		pushThis(marker);
		
	};
	


	//this.currentLocation = ko.observable();
	this.setLocation = function(clickedLocation) {
		self.currentLocation(clickedLocation);

	};

};

ko.applyBindings(ViewModel());
