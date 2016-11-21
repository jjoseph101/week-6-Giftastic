//javascript

//initial array of sports
var sports = ['Golf', 'Football', 'Baseball', 'Basketball'];

//generate buttons
function renderButtons () {

	//clear all buttons
	$("#sportsButtons").empty ();

	//loop through array of sports and create button for each
	for (var i=0; i<sports.length; i++) {
		var a = $('<button>');
		a.addClass('sportB');
		a.attr('data-name', sports[i]);
		a.text(sports[i]);
		$("#sportsButtons").append(a);
	};
};

	//add user input to sports array and redraw buttons
	// $('#addSport').on('click', function () {
	// 	var sportAdd = $('#focusedInput').val().trim();
	// 	sports.push(sportAdd);
	// 	renderButtons();
	// 	$('#sports-form')[0].reset();
	// 	return false;
	// });

//draw buttons
renderButtons();

function clickIt () {
	$(".sportB").on("click", function(){
		var sportPick = $(this).data("name");
		if (sportPick=="submit") {
			var sportAdd = $('#focusedInput').val().trim();
			sports.push(sportAdd);
			renderButtons();
			$('#sports-form')[0].reset();
			clickIt();
			return false;
		} else {
		var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&"+"q="+sportPick;

		$.ajax({url: queryURL, method: "GET"}).done(function(response){
			console.log("SportPick "+sportPick)
			var results = response.data;
			console.log(results);
			for (var i=0; i < 10; i++) {
				var sportDiv = $("<div>");
        		var rating = results[i].rating;
        		var p = $("<p>").text("Rating: " + rating);
        		var sportImage = $("<img>");
        		sportImage.attr("src", results[i].images.fixed_height_still.url);
        		sportDiv.prepend(p);
        		sportDiv.prepend(sportImage);
       			$("#sportsGifs").prepend(sportDiv);	
			}


		})
		}

	});
};

clickIt ();