
var initialLocations = [
	{
		name : "Ivory Tower",
		address : "308 S. Akard st, Dallas, TX"
	},
	{
		name : "North Park",
		address : "8687 N Central Expressway, Suite 2340, NorthPark Center, Dallas, TX"
	},
	{
		name : "Grand Prairie",
		address : "2305 W I-20, Suite 100, Grand Prairie, TX"
	},
	{
		name : "Mansfield",
		address : "1971 U.S. 287 Frontage Rd Ste. 113, Mansfield, TX"
	},
	{
		name : "Galleria",
		address : "13710 Dallas Pkwy, Dallas, TX"
	}
];	

var Location = function(data) {
	this.name = ko.observable(data.name);
	this.address = ko.observable(data.address);
}

var ViewModel = function() {
	var self = this;

	self.locationList = ko.observableArray([]);

	initialLocations.forEach(function(locationItem){
		self.locationList.push( new Location(locationItem) );
	});

	this.currentLocation = ko.observable(  );
	this.setLocation = function(clickedLocation) {
		self.currentLocation(clickedLocation);
	};

};

ko.applyBindings(ViewModel());
