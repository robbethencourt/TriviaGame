// Javascript function that wraps everything
$(document).ready(function(){

	var triviaGame = {
		start_game_screen: $('#start-game-screen'), // this is a div
		start_game: $('#start-game'), // this is a button
		game_screen: $('#game-screen'),

		fadeInGameScreen: function () {

			// fade in the game screen
			$(this.game_screen).fadeIn(500);
		},

		startGame: function (e) {

			//fade out the start game screen
			$(this.start_game_screen).fadeOut(500);

			// delay the game screen after the start game screen has faded out
			setTimeout(function () {
				// not sure why, but I couldn't use the this keyword here and had to call the triviaGame object
				triviaGame.fadeInGameScreen();
			}, 1000);
		}
	}

	triviaGame.start_game.on('click', function () {
		triviaGame.startGame();
	})

});