var imgArray = {
	pic: [
			{
				name: "Orange",
				img: "../static/img/tiger.png",
				description: "Orange Image from brand center"
			},
			{
				name: "Blue",
				img: "../static/img/tiger1.png",
				description: "Image from brand center"
			}
		]	
};



imgArray.pic.forEach(function(pic){
	$('#main').append('<div id="'+pic.name+'">'+pic.name+'</div><img id="target'+pic.name+'" src="' + pic.img + '" width="100"><p id="count'+pic.name+'">'+pic.description+'</p>');
	$('#target'+pic.name).click(function(){
		//console.log(pic.count);
		$('#big').empty();
		$('#big').append('<img class="bigimage" id="bigtarget'+pic.name+'" src="' + pic.img + '">');
	})
});
