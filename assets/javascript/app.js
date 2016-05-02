// Javascript function that wraps everything
$(document).ready(function(){

	var triviaGame = {
		start_game_screen: $('#start-game-screen'), // div
		start_game: $('#start-game'), // button
		game_screen: $('#game-screen'), // div
		animated_bg: $('#animated-bg'), // div
		animated_bg_bottom: 0,
		wins: 0,
		total_answers: 5,
		correct_answers: 0,
		incorrect_answers: 0,
		unanswered: 0,
		total_correct_answers: $('#total-correct-answers'), // span
		total_incorrect_answers: $('#total-incorrect-answers'), // span
		total_unanswered: $('#total-unanswered'), // span
		qs_and_as: [{
			// Question 1 [0]
			question: 'What French filmmaker directed "A Trip To The Moon"?',
			answers: [{
					answer: 'George Melies',
					correct: true
				}, {
					answer: 'Francois Truffaut',
					correct: false
				}, {
					answer: 'Jean-Luc Godard',
					correct: false
				}, {
					answer: 'Alexandre Bustillo',
					correct: false
				}]
			}, {
			// Question 2 [1] 
			question: '"A Trip to the Moon" is known for having a satyrical tone that exagerates nineteenth-century science. Melies does not attempt to depict this journey to our moon in any realistic terms. Knowing that, what device is used to propel the astronomers to the moon?',
			answers: [{
					answer: 'slingshot',
					correct: false
				}, {
					answer: 'alien technology',
					correct: false
				}, {
					answer: 'cannon',
					correct: true
				}, {
					answer: 'telekinesis',
					correct: false
				}]
			}, {
			// Question 3 [2]
			question: 'The "vocabulary" for narrative films began to be established after "A Trip To The Moon" was made in 1902. It is said that the film more closely resemble a theatrical production becuase of the highly styled mise en scene and what filmic technique?',
			answers: [{
					answer: 'juxtaposition of shots',
					correct: false
				}, {
					answer: 'stationary camera',
					correct: true
				}, {
					answer: 'varried camera angles',
					correct: false
				}, {
					answer: 'special effects',
					correct: false
				}]
			}, {
			// Question 4 [3]
			question: 'Like many silent films of its era, "A Trip To The Moon" was almost lost forever. It took unitl 1997 to piece together the entire film from various prints discoveed throughout the 20th century. What end sequence was missing from earlier versions?',
			answers: [{
					answer: 'Celebration',
					correct: true
				}, {
					answer: 'Revival of the main astronaut',
					correct: false
				}, {
					answer: 'Invasion of Earth by the lunar inhabitants',
					correct: false
				}, {
					answer: 'A man and woman entering a movie theater',
					correct: false
				}]
			}, {
			// Question 5 [4]
			question: 'Silent films were often given color by applying dyes to parts of the imagae. An originally colorized version of "A Trip To The Moon" was discoverd at the Filmoteca de Catalunya in Barcelona in what year?',
			answers: [{
					answer: '1922',
					correct: false
				}, {
					answer: '1975',
					correct: false
				}, {
					answer: '1993',
					correct: true
				}, {
					answer: '2011',
					correct: false
				}]
			}
		],
		current_question: 0,
		correct_answer: null,
		question_timer: 30,
		question_timer_display: $('#question-timer-display'), // p
		q_display: $('#q-display'), // p
		correct_incorrect_display: $('#correct-incorrect-display'), // p
		answers_li: $('.answers-li'),
		answer_timer: 3,
		end_game_screen: $('#end-game-screen'),
		all_q_correct: $('#all-q-correct'),
		reset_game: $('#reset-game'),

		fadeInGameScreen: function () {

			// fade in the game screen
			$(this.game_screen).fadeIn(500);

		},

		startGame: function () {

			// reset the key values
			this.animated_bg_bottom = 0;
			this.total_answers = 5;
			this.correct_answers = 0;
			this.incorrect_answers = 0;
			this.unanswered = 0;
			this.current_question = 0;
			this.correct_answer = null;

			this.animated_bg.animate({
				bottom: '0%'
			}, 1000 * 5);

			// fade out the start game screen
			$(this.start_game_screen).fadeOut(500);

			// fade out the end game screen
			$(this.end_game_screen).fadeOut(500);

			// delay the game screen after the start game screen has faded out
			setTimeout(function () {
				// not sure why, but I couldn't use the this keyword here and had to call the triviaGame object
				triviaGame.fadeInGameScreen();
			}, 1000);

			// Start the displaying the questions, answers and the countdown once the game screen appears
			setTimeout(function () {
				triviaGame.displayQandA();
			}, 1000);
			
		},

		qTimer: null,
		aTimer: null,

		timer: function (time_to_pass) {

			// determine if the timer should be set to the question timer of 30 seconds or the answer timer of 10 seconds
			if (time_to_pass === "question") {

				// reset the question timer to 30
				this.question_timer = 30;

				// I needed to create an anonymous function to not return undefined
				this.qTimer = setInterval(function () {

					// pass the question string to the count function so it knows what to do once it hits 0
					triviaGame.count("question");

				}, 1000);

			} else {

				// answer timer
				// reset the answer timer to 3
				this.answer_timer = 3;

				// I needed to create an anonymous function to not return undefined
				this.aTimer = setInterval(function () {

					// pass the answer string to the count function so it knows what to do once it hits 0
					triviaGame.count("answer");

				}, 1000);

			} // end if else

		},

		count: function (time_to_further_pass) {

			// determine what the timer should do based on if it's set to the question or answer timer
			if (time_to_further_pass === "question") {

				// reduce the amount of time by one
				this.question_timer--;

				// update the screen with the current available time
				this.question_timer_display.html(this.question_timer);

				// once the timer hits 0...
				if (this.question_timer === 0) {

					// ...stop the timer
					clearInterval(this.qTimer);

					// call the guess function and pass it an icorrect parameter
					this.guess(5);

					// increment the unanswered key by 1
					this.unanswered++;

				} // end if

			} else {

				// answer count
				// reduce the amount of time by one
				this.answer_timer--;

				// once the timer hits 0...
				if (this.answer_timer === 0) {

					// ...stop the timer
					clearInterval(this.aTimer);
					this.game_screen.fadeOut(500);

					// set a timeout so that the delay allows the game screen to fade out while the background animates and the game screen gets repopulated with the new question
					setTimeout(function () {
					
						// only run the displayQandA function if there are more questions left to ask
						if (triviaGame.current_question < 5) {

							// fade the game screen back in
							triviaGame.game_screen.fadeIn(500);

							triviaGame.displayQandA();

						} else {

							 // display the end game screen
							 triviaGame.displayEndGameScreen();
							 
						} // end if else

					}, 1000 * 3);


				} // end if

			} // end if else
			
		},

		displayQandA: function () {
			
			// display the current question to the screen
			this.q_display.html(this.qs_and_as[this.current_question].question);

			// erase the correct_incorrect_display
			this.correct_incorrect_display.html("");

			// loop through the answers...
			for (var i = 0; i < 4; i++) {

				// ...display them to the screen
				$(this.answers_li[i]).html(this.qs_and_as[this.current_question].answers[i].answer);

				// set correct_answer to the index of the key to the true value from the answers.correct array
				if (this.qs_and_as[this.current_question].answers[i].correct === true) {
					this.correct_answer = i;
				} // end if

			} // end for loop

			// start the question countdown
			triviaGame.timer("question");

			// increment the current question so that the following quesiton is correctly displayed to the screen when this function is run again
			this.current_question++;

		},

		guess: function (data_index) {

			// stop the countdown
			clearInterval(this.qTimer);

			// turn the data index into an integer as it's passed as a string
			var data_index_int = parseInt(data_index);

			// if the player guessed correctly
			if (data_index_int === this.correct_answer) {

				// increment correct_answers by 1
				this.correct_answers++;

				// display a correct message
				this.correct_incorrect_display.html("Correct");

				// animate the animate-bg div down 20% of the way. Using setTimeout here so tha the background won't animate until the game screen has faded out.
				setTimeout(function () {

					// store the amout of time to animate in a variable so it can be increased each time a correct answer is guessed. If not, then the background will not move after the first correct guess as I'll be updating the bottom by the same amount
					var amount_to_animate = triviaGame.animated_bg_bottom + 20;

					// update the animate_bg_bottom to the amount to animate so I'm updating it correctly each time
					triviaGame.animated_bg_bottom = amount_to_animate;

					triviaGame.animated_bg.animate({
						bottom: '-' + amount_to_animate + '%'
					}, 1000 * 5);

				}, 1000 * 3);

			// the player did not guess correctly
			} else {

				// display a correct message
				this.correct_incorrect_display.html("Sorry, the correct answer was...");

				// check to see that an answer was given or if it was left unanswered. If there was no answer given...
				if (data_index < 5) {

					// ...increment the incorrect answers key by 1
					this.incorrect_answers++;

				}

			} // end if else

			// loop through the answers_li
			for (var i = 0; i < 4; i++) {

				// if the data-index on the answers_li don't match...				
				if (parseInt(this.answers_li[i].getAttribute("data-index")) !== this.correct_answer) {

					// ...fade out that li element. This should leave only the correct answer showing
					$(this.answers_li[i]).html("");

				} // end if

			} // end for loop

			// run the answer timer as long as there are questions left to ask
			if (this.current_question < 6) {
				
				// start the question countdown
				triviaGame.timer("answer");

			} // end if
			
		},

		displayEndGameScreen: function () {

			// fade out the game screen
			$(this.game_screen).fadeOut(500);

			// add the correct, incorrect and unanswered amounts to the stats-ul element
			$(this.total_correct_answers).html(this.correct_answers);
			$(this.total_incorrect_answers).html(this.incorrect_answers);
			$(this.total_unanswered).html(this.unanswered);

			// if the player got all 5 questions correct...
			if (this.correct_answers === 5) {

				// ...display a congratulatory message for getting all 5 questions correct
				$(this.all_q_correct).html("Congratulations! You got all 5 questions correct");

			} // end if
			
			// fade in the end game screen
			$(this.end_game_screen).fadeIn(500);

		}

	}

	// click event for th start game function
	triviaGame.start_game.on('click', function () {

		// start the game
		triviaGame.startGame();

	});

	// when the player presses one of the answers on screen
	triviaGame.answers_li.on('click', function () {

		// pass the clicked element's data-index value to the guess function. I need to get the attribute here instead of passing it to the function and then running getAttribute because if there's no guess I'll be evaluating no element and the getAttribute will cause my scripts to return and TypeError which will break everything and make the player sad that they can't continue playing my wonderful game
		triviaGame.guess(this.getAttribute("data-index"));

	});

	// reset the game when the player presses the #reset-game button
	triviaGame.reset_game.on('click', function () {

		// calling the start game to reset the game without the need for the title screen and going directly to the first question
		triviaGame.startGame();

	});

});