'use strict';

var POINTS_PER_RIGHT_CHOICE = 100;
var POINTS_PER_WRONG_CHOICE = -100;

var CHALLENGES = [{
	// Target range is 2.0-3.5, random value is below range
	minTargetInr: 2.0,  // inclusive lower bound
	maxTargetInr: 3.5,  // inclusive upper bound
	minRandInr: 1.0,    // inclusive lower bound
	maxRandInr: 1.9     // inclusive upper bound
}, {
	// Target range is 2.0-3.5, random value is within range
	minTargetInr: 2.0,
	maxTargetInr: 3.5,
	minRandInr: 2.0,
	maxRandInr: 3.5
}, {
	// Target range is 2.0-3.5, random value is above range
	minTargetInr: 2.0,
	maxTargetInr: 3.5,
	minRandInr: 3.6,
	maxRandInr: 5.0
}, {
	// Target range is 2.0-3.5, random value is below range
	minTargetInr: 3.0,
	maxTargetInr: 4.0,
	minRandInr: 1.0,
	maxRandInr: 2.9
}, {
	// Target range is 2.0-3.5, random value is below range
	minTargetInr: 3.0,
	maxTargetInr: 4.0,
	minRandInr: 3.0,
	maxRandInr: 4.0
}, {
	// Target range is 2.0-3.5, random value is below range
	minTargetInr: 3.0,
	maxTargetInr: 4.0,
	minRandInr: 4.1,
	maxRandInr: 5.0
}];

angular.module('CoumadinApp').controller('PTINRMonitoringController', function($rootScope, $scope, $timeout, _) {
	console.log('ptinr controller loading');
	var answerToDisplay; //set to either in-range or out-of-range


	$scope.answers = [{
		label: 'My blood is not too thick and not too thin',
		inr: {
			below: false, // whether this answer is true when INR value is below patient's range
			within: true, // whether this answer is true when INR value is within patient's range
			above: false  // whether this answer is true when INR value is above patient's range
		},
		display: true,
		selected: false
	}, {
		label: 'My blood is too thin and can bleed easily',
		inr: {
			below: false, // whether this answer is true when INR value is below patient's range
			within: false, // whether this answer is true when INR value is within patient's range
			above: true  // whether this answer is true when INR value is above patient's range
		},
		display: true,
		selected: false
	}, {
		label: 'My blood is too thick',
		inr: {
			below: true, // whether this answer is true when INR value is below patient's range
			within: false, // whether this answer is true when INR value is within patient's range
			above: false  // whether this answer is true when INR value is above patient's range
		},
		display: true,
		selected: false
	}, {
		label: 'I will take my Coumadin dose and call my doctor',
		inr: {
			below: true, // whether this answer is true when INR value is below patient's range
			within: false, // whether this answer is true when INR value is within patient's range
			above: false  // whether this answer is true when INR value is above patient's range
		},
		display: 'out-of-range',
		selected: false
	},  {
		label: 'I will take my Coumadin as normal',
		inr: {
			below: false, // whether this answer is true when INR value is below patient's range
			within: true, // whether this answer is true when INR value is within patient's range
			above: false  // whether this answer is true when INR value is above patient's range
		},
		display: 'in-range',
		selected: false
	}];

	$scope.INR_STATUSES = {
		NOT_STARTED: 'notstarted',
		TESTING: 'testing',
		DONE: 'done'
	}

	$scope.inrValue = null;
	$scope.inrStatus = null;
	$scope.challenges = [];
	$scope.activeChallenge = null;


	var restartEventHandle = $rootScope.$on('minigame:scenario:restart', initScenario);
	var resumeEventHandle = $rootScope.$on('minigame:scenario:resume', function(event, priorStatus) {
		resumeScenario(priorStatus);
	});

	// deregister event listeners when this controller is destroyed
	$scope.$on("$destroy", function() {
        restartEventHandle();
        resumeEventHandle();
    });

	initScenario();

	function initScenario() {
	    $scope.activeScenario.custom = {
	        coumadinReasons: {
	            heartDisease: false,
	            lungClot: false,
	            dvt: false,
	            other: false
	        }
	    };
	    
		// override testSubmit with a custom condition check
		$scope.activeScenario.testSubmit = function() {
			if (countSelectedAnswers() === 0) {
				return 'Please select at least one answer before submitting';
			}
			return null;
		};
		// override footerReset to perform custom reset when footer reset button is clicked
		$scope.activeScenario.footerReset = function() {
			clearSelectedAnswers();
		};

		// Select challenges that match the user's PT/INR targets
		var patientInrTarget = getPatientMinMaxInr();
		$scope.challenges = _.shuffle(_.where(CHALLENGES, { minTargetInr: patientInrTarget.min, maxTargetInr: patientInrTarget.max }));
		$scope.inrValue = null;
		$scope.inrStatus = $scope.INR_STATUSES.NOT_STARTED;

		// Select a random challenge scenario
		clearSelectedAnswers();
		selectChallenge();
		displayInstructions();
		customizeScenarioStatus();
	}

	function resumeScenario(priorStatus) {
		console.log('resuming after ' + priorStatus.outcome + ' outcome');
		// If player was successful, pick a new challenge and remove prior selected items from play
		if (priorStatus.outcome === 'good') {
			$scope.inrValue = null;
			$scope.inrStatus = $scope.INR_STATUSES.NOT_STARTED;
			clearSelectedAnswers();
			selectChallenge();
			customizeScenarioStatus(0, 0);
		}
		displayInstructions();
	}

	function selectChallenge() {
		// Select a random challenge from those remaining
		var randomIndex = randomInt(0, $scope.challenges.length);
		$scope.activeChallenge = $scope.challenges[randomIndex];

		// Remove the selected challenge from the remaining challenges so it can't be selected again
		$scope.challenges.splice(randomIndex, 1);
	}

	function displayInstructions() {
		// $rootScope.showMessage({
		// 	type: 'info',
		// 	text: 'Tap on the red button on top of meter to begin INR testing'
		// });
	}

	function customizeScenarioStatus() {
		$scope.activeScenario.status.custom = {
			numRightChoices: 0,
			numWrongChoices: 0,
			pointsPerRightChoice: POINTS_PER_RIGHT_CHOICE,
			pointsPerWrongChoice: POINTS_PER_WRONG_CHOICE
		};
	}

	function calculateScore() {
		var numRightChoices = 0;
		var numWrongChoices = 0;

		_.each($scope.answers, function(answer) {
			if (answer.display === true || answer.display === answerToDisplay) {
				var correctValue = null;
				var selectedValue = answer.selected;

				var patientInrTarget = getPatientMinMaxInr();
				// Determine whether the answer should have been checked
				if ($scope.inrValue > patientInrTarget.max) {
					// patient's INR value is above the target range
					correctValue = answer.inr.above;
				} else if ($scope.inrValue >= patientInrTarget.min) {
					// patient's INR value is within the target range
					correctValue = answer.inr.within;
				} else {
					// patient's INR value is below the target range
					correctValue = answer.inr.below;
				}

				// Determine whether the user's choice was right or wrong for this answer
				if (correctValue === selectedValue && selectedValue) {
					// user selected a right value
					numRightChoices++;
				}
				if (correctValue !== selectedValue && selectedValue) {
					// user selected a wrong value
					numWrongChoices++;
				}
			}
		});

		var scoreChange = (numWrongChoices * POINTS_PER_WRONG_CHOICE) + (numRightChoices * POINTS_PER_RIGHT_CHOICE);
		var outcome = 'good';
		if (numWrongChoices > 0) {
			outcome = 'bad';
		}

		$scope.activeScenario.status.scoreChange = scoreChange;
		$scope.activeScenario.status.outcome = outcome;
		$scope.activeScenario.status.custom = {
			selectedDrugs: $scope.selectedDrugs,
			numWrongChoices: numWrongChoices,
			numRightChoices: numRightChoices,
			pointsPerRightChoice: POINTS_PER_RIGHT_CHOICE,
			pointsPerWrongChoice: POINTS_PER_WRONG_CHOICE
		};
		$scope.activeScenario.status.complete = ($scope.activeScenario.status.outcome === 'good' && $scope.challenges.length === 0);
		console.log('numRightChoices = ' + numRightChoices + ', numWrongChoices = ' + numWrongChoices + ', outcome = ' + $scope.activeScenario.status.outcome);
	};

	function clearSelectedAnswers() {
		_.each($scope.answers, function(answer) {
			answer.selected = false;
		});
	}

	$scope.startInrTest = function() {
		$scope.inrStatus = $scope.INR_STATUSES.TESTING;
		$timeout(function() {
			$scope.inrValue = randomInrValue($scope.activeChallenge.minRandInr, $scope.activeChallenge.maxRandInr);
			$scope.inrStatus = $scope.INR_STATUSES.DONE;
			determineAnswersToDisplay();
		}, 4000);
		
	};

	$scope.onToggleAnswer = function(answer) {
		calculateScore();
	}

	function getPatientMinMaxInr() {
		var heartDiseaseSelected = $scope.activeScenario.custom.coumadinReasons.heartDisease;
		var lungClotSelected = $scope.activeScenario.custom.coumadinReasons.lungClot;
		var dvtSelected = $scope.activeScenario.custom.coumadinReasons.dvt;
		var otherSelected = $scope.activeScenario.custom.coumadinReasons.other;
		if (heartDiseaseSelected || lungClotSelected || dvtSelected) {
			return {
				min: 2.0,
				max: 3.5
			};
		}
		return {
			min: 3.0,
			max: 4.0
		}
	}

	$scope.getPatientMinMaxInr = getPatientMinMaxInr;

	function randomInrValue(low, high) {
		
		// generate a random number with 1 decimal point, between low (inclusive) and high (inclusive)
		// return (Math.Floor(Math.random() * ((high - low) * 10 + 1)) + low) / 10;
		return randomInt(low * 10, high * 10 + 1) / 10;
	}

	function randomInt(low, high) {
		// generate a random integer between low (inclusive) and high (exclusive)
		return Math.floor(Math.random() * (high - low) + low);
	}

	function countSelectedAnswers() {
		return _.reduce($scope.answers, function(memo, answer) { return memo + answer.selected ? 1 : 0; }, 0);
	}

	function determineAnswersToDisplay() {
		var patientInrTarget = getPatientMinMaxInr();
			
		console.log($scope.inrValue);
		console.log(patientInrTarget);
			
		if ($scope.inrValue > patientInrTarget.max) {
			// patient's INR value is above the target range
			answerToDisplay = 'out-of-range';
		} else if ($scope.inrValue >= patientInrTarget.min) {
			// patient's INR value is within the target range
			answerToDisplay = 'in-range';
		} else {
			// patient's INR value is below the target range
			answerToDisplay = 'out-of-range';
		}
		console.log(answerToDisplay);

		$scope.displayFilter = $scope.answers.filter(function (input) {
			return (input.display === true || input.display === answerToDisplay);
		});

	}




});
