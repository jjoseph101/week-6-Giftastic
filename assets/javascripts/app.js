//javascript

//initial array of sports moves
var sports = ['Golf Swing', 'Football Catch', 'Baseball Homerun', 'Basketball Dunk', 'Boxing Knockout', 'Wrestling Slam', 'Soccer Goal'];

//generate buttons
function renderButtons () {

	//clear all buttons
	$("#sportsButtons").empty ();

	//loop through array of sports and create button for each
	for (var i=0; i<sports.length; i++) {
		if (sports[i]=="") { //skip empty ("") array items
		} else { //make button for each item
			var a = $('<button>');
			a.addClass('sportB');
			a.addClass('btn');
			a.addClass('btn-primary');
			a.attr('data-name', sports[i]);
			a.attr('style', "margin-left:5px;")
			a.text(sports[i]);
			$("#sportsButtons").append(a);
		};
	};
};

//draw buttons
renderButtons();

//function to capture button click
function clickIt () {
	$(".sportB").on("click", function(){
		var sportPick = $(this).data("name");

		if (sportPick=="submit") {//if submit button clicked...
			var sportAdd = $('#focusedInput').val().trim();
			sports.push(sportAdd);
			renderButtons();
			$('#sports-form')[0].reset();
			clickIt();
			return false;
		} else { //if sports action item button clicked
			var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&"+"q="+sportPick;
			$.ajax({url: queryURL, method: "GET"}).done(function(response){
				console.log("SportPick "+sportPick)
				var results = response.data;
				console.log(results);
				for (var i=0; i < 10; i++) { //loop to run for first 10 gifs from api data
					var sportDiv = $("<div>");
	        		var rating = results[i].rating;
	        		var p = $("<p>").text("Rating: " + rating);
	        		var sportImage = $("<img>");
	        		var stillImage = results[i].images.fixed_height_still.url;
	        		sportImage.attr("src", stillImage);
	        		sportImage.attr("style", "float: left; margin: 20px 10px 20px 10px;");
	        		sportImage.attr("class", "gifs");
	        		sportImage.attr("data-still", results[i].images.fixed_height_still.url);
	        		sportImage.attr("data-animate", results[i].images.fixed_height.url);
	        		sportImage.attr("data-state", "still");
	        		p.attr("style", "float: left; color: white; margin-left:-10%; margin-top: -5px;");
	        		sportDiv.prepend(p);
	        		sportDiv.prepend(sportImage);
	       			$("#sportsGifs").prepend(sportDiv);
	       			$("sportsGifs").prepend("<BR>");
				};
			});
		};
	});
};

//click event listener for animated gifs
$(document.body).on("click", ".gifs", function(){
	var state = $(this).attr("data-state");
	if (state=="still") { //make pic animate
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else { //make pic still
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	};
});

clickIt (); //function to capture button click
