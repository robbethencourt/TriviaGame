// Javascript function that wraps everything
$(document).ready(function(){

	var triviaGame = {
		start_game_screen: $('#start-game-screen'), // div
		start_game: $('#start-game'), // button
		game_screen: $('#game-screen'), // div
		animated_bg: $('#animated-bg'), // div
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
		q_and_correct_incorrect_display: $('#q-and-correct-incorrect-display'), // h2
		answers_li: $('.answers-li'),


		fadeInGameScreen: function () {

			// fade in the game screen
			$(this.game_screen).fadeIn(500);
		},

		startGame: function () {

			//fade out the start game screen
			$(this.start_game_screen).fadeOut(500);

			// delay the game screen after the start game screen has faded out
			setTimeout(function () {
				// not sure why, but I couldn't use the this keyword here and had to call the triviaGame object
				triviaGame.fadeInGameScreen();
			}, 1000);

			// Start the question countdown once the game screen appears
			setTimeout(function () {
				triviaGame.questionTime();
			}, 1000)
		},

		timer: null,

		questionTime: function () {

			// I needed to create an anonymous function to not return undefined
			this.timer = setInterval(function () {
				triviaGame.countQuestionTime();
			}, 1000);
		},

		countQuestionTime: function () {

			// reduce the amount of time by one
			this.question_timer--;
			// update the screen with the current available time
			this.question_timer_display.html(this.question_timer);

			if (this.question_timer === 0) {
				clearInterval(this.timer);
				this.guess();
			}
		},

		displayQandA: function () {
			
			q_and_correct_incorrect_display.html(qs_and_as[current_question].question);
		},

		guess: function () {
			console.log("yo");
		}
	}

	// click event for th start game function
	triviaGame.start_game.on('click', function () {
		triviaGame.startGame();
	})

});