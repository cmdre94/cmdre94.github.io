
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
	this.address = ko.observable(data.address);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.title = ko.observable(data.title);
	this.marker = ko.observable(0);
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
	self.locationList = ko.observableArray([]);

	/*places.forEach(function(markerItem) {
			self.locationList.push( new Location(markerItem))
		});
		console.log(locationList());*/
		

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
	this.markerClick = function(marker) {
		google.maps.event.trigger(marker, 'click', marker);
		setLocation(marker);	
	};

	//This is the function that was not in Knockout.js
	var stringStartsWith = function (string, startsWith) {          
	    string = string || "";
		if (startsWith.length > string.length)
		   	return false;
		    return string.substring(0, startsWith.length) === startsWith;
	};

	//THE LIST FILTER: 
	self.filter = ko.observable('');
	this.filteredItems = ko.computed(function() {
	    var filteredList = self.filter().toLowerCase();
		if (!filteredList) {
			return this.locationList();
			marker.setVisible(true);
		} 
			else {
				return ko.utils.arrayFilter(this.locationList(), function(item) {
		  			return stringStartsWith(item.title.toLowerCase(), filteredList);	    
		        });
	    	}
		}, this);

		this.filteredMarkers = ko.computed(function() {
			var markerList = self.filter().toLowerCase();
			if (!markerList) {
				return this.locationList();
					marker.setVisible(true);
						return true;
			} else {
				return ko.utils.arrayFilter(this.marker, function(marker) {
					return stringStartsWith(point.title.toLowerCase(), markerList);
					marker.setVisible(false);
				});
			}
		}, this);

	
	
	//iterates through the places array and creates the markers
	for (var i = 0; i < places.length; i++) {
		var latLng = new google.maps.LatLng(places[i].lat, places[i].lng);
		var marker = new google.maps.Marker({
			address: places[i].address,
			position: latLng,
			map: map,
			title: places[i].title,
		});
		self.infoWindow = new google.maps.InfoWindow({
		    content: places[i].title
		});
		google.maps.event.addListener(marker, 'click', handleThis(marker, infoWindow));
		locationList.push(marker);
	};

	//displays the address at the bottom of the locations list
	this.currentLocation = ko.observable();
	this.setLocation = function(clickedLocation) {
		self.currentLocation(clickedLocation);
	};
};



