// Institute Variables

var time = 20;
var intervalId = "";
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var arrayFinder = 0;


var question01 = {
	question: "What is the other name of Experiment 626?",
	answers: ["Lilo", "Stitch", "Pleakley", "Gantu"],
	values: ["incorrect", "correct", "incorrect", "incorrect"],
	correct: "Stitch",
	image: "./assets/images/stitch.png"
};
var question02 = {
	question: "What are the names of Ursula's eels?",
	answers: ["Flotsam and Jetsam", "Romeo and Juliet", "Bonnie and Clyde", "Thelma and Louise"],
	values: ["correct", "incorrect", "incorrect", "incorrect"],
	correct: "Flotsam and Jetsam",
	image: "./assets/images/flotsamandjetsam.jpg"
};
var question03 = {
	question: "Who is the fairest one of them all?",
	answers: ["Belle", "Ariel", "Cinderella", "Snow White"],
	values: ["incorrect", "incorrect", "incorrect", "correct"],
	correct: "Snow White",
	image: "./assets/images/snowwhite.png"
};
var question04 = {
	question: "Who went from zero to hero?",
	answers: ["Aladdin", "John Smith", "Hercules", "Simba"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "Hercules",
	image: "./assets/images/hercules.png"
};
var question05 = {
	question: "Who is not a member of Woody's Roundup",
	answers: ["Buzz Lightyear", "Jessie", "Bullseye", "Stinky Pete"],
	values: ["correct", "incorrect", "incorrect", "incorrect"],
	correct: "Buzz Lightyear",
	image: "./assets/images/buzzlightyear.png"
};
var question06 = {
	question: "What is the name of the cup in Beauty and the Beast?",
	answers: ["Flake", "Splinter", "Notch", "Chip"],
	values: ["incorrect", "incorrect", "incorrect", "correct"],
	correct: "Chip",
	image: "./assets/images/chip.png"
};

var questionsArray = [question01, question02, question03, question04, question05, question06];

// Functions

	function start () {
		$(".content-div").empty();
		var startButton = $("<button>");
		startButton.text("Start");
		startButton.addClass("start btn btn-default answerBtn");
		$(".content-div").append(startButton);
	};

	function run() {
      intervalId = setInterval(decrement, 1000);
    };

    function decrement() {
      time--;
      $(".timer-div").html("Time Remaining: " + time + " Seconds");
      if (time == 0) {
        stop();
        if (arrayFinder < questionsArray.length-1) {
	        unanswered++;
	        solutionWrite(questionsArray[arrayFinder]);
	        $(".question-div").html("Incorrect!");
	        arrayFinder++;
	        setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
      	}
      	else if (arrayFinder < questionsArray.length) {
      		unanswered++;
	        solutionWrite(questionsArray[arrayFinder]);
	        $(".question-div").html("Incorrect!");
	        arrayFinder++;
	        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      	}
      };
    };

    function stop() {
      clearInterval(intervalId);
    };

	function questionWrite (obj) {
		time = 20;
		$(".timer-div").empty();
		$(".timer-div").html("Time Remaining: " + time + " Seconds");
		$(".question-div").empty();
		$(".content-div").empty();
		run ();
		$(".question-div").html(obj.question);
		for (var i = 0; i < obj.answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-default answerBtn");
			answerButton.text(obj.answers[i]);
			answerButton.attr("value", obj.values[i]);
			$(".content-div").append(answerButton);
			$(".content-div").append("<br>");
		};
	};

	function solutionWrite (obj) {
		$(".question-div").empty();
		$(".content-div").empty();
		$(".content-div").html("The correct answer was " + obj.correct + "<br>");
		var characterImage = $("<img>");
		characterImage.attr("height", "250");
		characterImage.attr("src", obj.image);
		characterImage.addClass("character")
		$(".content-div").append(characterImage);
	};

	function startWrite () {
		questionWrite(question01);
	};

	function answerSelect () {
		if ($(this).attr("value") == "correct") {
			stop();
			if (arrayFinder < questionsArray.length-1) {
				solutionWrite(questionsArray[arrayFinder]);
				$(".question-div").html("Correct!");
				correct++;
				arrayFinder++;
				setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
			}
			else if (arrayFinder < questionsArray.length) {
	      		correct++;
		        solutionWrite(questionsArray[arrayFinder]);
		        $(".question-div").html("Correct!");
		        arrayFinder++;
		        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      		}
		}
		else if ($(this).attr("value") == "incorrect") {
			stop();
			if (arrayFinder < questionsArray.length-1) {
				solutionWrite(questionsArray[arrayFinder]);
				$(".question-div").html("Incorrect!");
				incorrect++;
				arrayFinder++;
				setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
			}
			else if (arrayFinder < questionsArray.length) {
	      		incorrect++;
		        solutionWrite(questionsArray[arrayFinder]);
		        $(".question-div").html("Incorrect!");
		        arrayFinder++;
		        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      		}
		}
	};

	function endWrite () {
		$(".question-div").empty();
		$(".content-div").empty();
		$(".question-div").html("Here's how you did!");
		$(".content-div").html("<p> Correct: " + correct + "</p>" + "<p> Incorrect: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>");
		var resetButton = $("<button>");
		resetButton.addClass("reset btn btn-default answerBtn");
		resetButton.text("Start Over?");
		$(".content-div").append(resetButton);
	}

	function resetClick () {
		arrayFinder = 0;
		incorrect = 0;
		correct = 0;
		unanswered = 0;
		startWrite();
	}

	$(document).on("click", ".start", startWrite);

	$(document).on("click", ".answer", answerSelect);

	$(document).on("click", ".reset", resetClick);
// Running Code

start();