
var places = [
	{
		address : "208 S. Akard st, Dallas, TX",
		lat: "32.7797583",
		lng: "-96.7990691",
		title: "Ivory Tower",
		marker: ""
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
	this.address = data.address;
	this.lat = data.lat;
	this.lng = data.lng;
	this.title = data.title;
	this.marker = data.marker;
};


//THE MAP
//Initialize and load the map; apply the Knockout.js bindings to the ViewModel
var	map;

	initMap = function() {
		map = new google.maps.Map(document.querySelector('#map'), {
			center: {lat: 32.820351, lng: -97.0122201},
			zoom: 10,
			disableDefaultUI: true
		});
		ko.applyBindings(ViewModel());
	}; 
window.addEventListener('load', initMap);

//THE VIEWMODEL
var ViewModel = function() {

	var self = this;

	//Array of markers
	self.allPlaces = [];
		places.forEach(function(place) {
	    self.allPlaces.push(place);
  	});

	

	//Array of ko.observable markers
	self.locationList = ko.observableArray([]);

	places.forEach(function(place) {
			self.locationList.push(place);
		});	

	//FUNCTIONS: handleThis and markerClick; these functions were
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
	          	$('#currentLocation').empty();
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

	//animates the correct marker and opens the info window
	this.markerClick = function(location) {
		google.maps.event.trigger(location.marker, 'click');
	};

	//creates the marker and infowindow
	self.allPlaces.forEach(function(place) {
		latLng = new google.maps.LatLng(place.lat, place.lng);
		var markerOptions = {
			map: map,
			position: latLng
		};
		var infoWindowOptions = {
			content: place.title
		};

		place.marker = new google.maps.Marker(markerOptions);
		place.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
		
		google.maps.event.addListener(place.marker, 'click', handleThis(place.marker, place.infoWindow));	    
	});
	
	//THE LIST FILTER: 
	// The filter will look at the names of the places the Markers are standing
  	// for, and look at the user input in the search box. If the user input string
  	// can be found in the place name, then the place is allowed to remain 
  	// visible. All other markers are removed.
  	// Credit to http://codepen.io/prather-mcs/pen/KpjbNN?editors=1010
  	self.userInput = ko.observable('');
	self.filterMarkers = function() {
	    var searchInput = self.userInput().toLowerCase();
	    
	    self.locationList.removeAll();
	    
	    // This looks at the name of each places and then determines if the user
	    // input can be found within the place name.
	    // Credit to http://codepen.io/prather-mcs/pen/KpjbNN?editors=1010
	    self.allPlaces.forEach(function(place) {
	      	place.marker.setVisible(false);
	      
	      	if (place.title.toLowerCase().indexOf(searchInput) !== -1) {
	        	self.locationList.push(place);
	      	}
	    });
	    
	    
	    self.locationList().forEach(function(place) {
	      place.marker.setVisible(true);
	    });
	};
  
	function Place(data) {
	    this.title = data.title;
	    this.lat = data.lat;
	    this.lng = data.lng;
	    // This saves a reference to the Places' map marker after the marker
	    // is built
	    // credit to http://codepen.io/prather-mcs/pen/KpjbNN?editors=1010
	    this.marker = null;
	}

	//Makes the currentLocation available for the markerClick function
	this.currentLocation = ko.observable();
	this.setLocation = function(place) {
		self.currentLocation(place);
	};
};