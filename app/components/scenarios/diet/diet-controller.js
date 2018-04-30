'use strict';

var NUM_GAME_FOODS = 10;
var NUM_SELECTED_FOODS = 2;
var POINTS_PER_RIGHT_CHOICE = 100;
var POINTS_PER_WRONG_CHOICE = -100;

angular.module('CoumadinApp').controller('DietController', function($rootScope, $scope, $timeout, _) {
	console.log('diet controller loading');

	$scope.buffetFoods = [];
	$scope.selectedFoods = [];
	$scope.activeChallenge = null;

	for (var i = 0; i < NUM_GAME_FOODS; i++) {
		$scope.buffetFoods.push(null);
	}
	for (var i = 0; i < NUM_SELECTED_FOODS; i++) {
		$scope.selectedFoods.push(null);
	}

	var challenges = [{
		highK: 1,
		lowK: 1
	}, {
		highK: 2,
		lowK: 0
	}, {
		highK: 0,
		lowK: 2
	}];
	var singleItemChallenges = [{
		highK: 1,
		lowK: 0
	}, {
		highK: 0,
		lowK: 1
	}];

	var draggedFood = null;
	var singleItemRules = false;

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
		// override testSubmit with a custom condition check
		$scope.activeScenario.testSubmit = function() {
			var numSelectedFoods = countSelectedFoods();
			var targetSelectedFoods = singleItemRules ? 1 : NUM_SELECTED_FOODS;
			if (numSelectedFoods < targetSelectedFoods) {
				if (numSelectedFoods === 0) {
					return 'Please drag and drop ' + targetSelectedFoods + ' Vitamin K foods on the plate before you can submit.';
				} else {
					return 'Please add 1 more item to the plate before you can submit.';
				}
			}
			return null;
		};
		// override footerReset to perform custom reset when footer reset button is clicked
		$scope.activeScenario.footerReset = function() {
			for (var i = 0; i < $scope.selectedFoods.length; i++) {
				var selectedFood = $scope.selectedFoods[i];
				if (selectedFood) {
					for (var k = 0; k < $scope.buffetFoods.length; k++) {
						var buffetFood = $scope.buffetFoods[k];
						if (!buffetFood) {
							$scope.buffetFoods[k] = selectedFood;
							$scope.selectedFoods[i] = null;
							transferFood(selectedFood, onDragStartBuffet);
							break;
						}
					}
				}
			}
		};
	
		// Select foods at random
		var gameFoods = _.first(_.shuffle($scope.activeScenario.config.foodItems), NUM_GAME_FOODS);
		for (var i = 0; i < gameFoods.length; i++) {
			$scope.buffetFoods[i] = _.extend({}, gameFoods[i], { expanded: false });
		}

		// Select a random challenge scenario
		singleItemRules = false;
		clearSelectedFoods();
		selectChallenge();
		displayInstructions();

		$timeout(function() {
			console.log('foods: ' + angular.element('.food-card').length);
			angular.element('.buffet-drop-zone .food-card').on('dragstart', onDragStartBuffet);
			angular.element('.plate-drop-zone .food-card').on('dragstart', onDragStartPlate);
		}, 100);

		draggedFood = null;

		customizeScenarioStatus();
	}

	function resumeScenario(priorStatus) {
		console.log('resuming after ' + priorStatus.outcome + ' outcome');
		// If player was successful, pick a new challenge and remove prior selected items from play
		if (priorStatus.outcome === 'good') {
			_.each($scope.selectedFoods, function(selectedFood) {
				if (selectedFood) {
					var index = _.findIndex($scope.buffetFoods, { id: selectedFood.id });
					$scope.buffetFoods[index] = null;
				}
			});
			var remainingFoods = getRemainingFoods();
			if (remainingFoods.length <= NUM_SELECTED_FOODS) {
				console.log('entering SINGLE ITEM RULES mode');
				singleItemRules = true;
			}
			clearSelectedFoods();
			selectChallenge();
			customizeScenarioStatus(0, 0);
		}
		displayInstructions();
	}

	function selectChallenge() {
		var remainingHighKFoods = _.where($scope.buffetFoods, { kLevel: 1 });
		var remainingLowKFoods = _.where($scope.buffetFoods, { kLevel: 3 });

		var challengeSet = challenges;
		if (singleItemRules) {
			challengeSet = singleItemChallenges;
		}

		var availableChallenges = _.filter(challengeSet, function(challenge) {
			return challenge.highK <= remainingHighKFoods.length && challenge.lowK <= remainingLowKFoods.length;
		});
		// console.log("remaining k foods: high=" + remainingHighKFoods.length + ", low=" + remainingLowKFoods.length + ", challenges available:" + availableChallenges.length);

		$scope.activeChallenge = _.shuffle(availableChallenges)[0];
	}

	function displayInstructions() {
		var challengeInstructions = '';
		if ($scope.activeChallenge.highK > 0 && $scope.activeChallenge.lowK > 0) {
			challengeInstructions = 'Drag and drop ' + $scope.activeChallenge.highK + ' high and ' + $scope.activeChallenge.lowK + ' low Vitamin K foods on the plate.';
		} else if ($scope.activeChallenge.highK === 0 && $scope.activeChallenge.lowK > 0) {
			challengeInstructions = 'Drag and drop ' + $scope.activeChallenge.lowK + ' low Vitamin K food(s) on the plate.';
		} else {
			challengeInstructions = 'Drag and drop ' + $scope.activeChallenge.highK + ' high Vitamin K food(s) on the plate.';
		}
		console.log('instructions: ' + challengeInstructions);

		// Display instruction banner
		$rootScope.showMessage({
			type: 'info',
			text: challengeInstructions
		});
	}

	function clearSelectedFoods() {
		for (var i = 0; i < $scope.selectedFoods.length; i++) {
			$scope.selectedFoods[i] = null;
		}
	}

	$timeout(function() {
		angular.element('.plate-drop-zone, .buffet-drop-zone').on('dragover', onDragOver);
		angular.element('.plate-drop-zone').on('drop', onPlateDrop);
		angular.element('.buffet-drop-zone').on('drop', onBuffetDrop);
	}, 0);

	function customizeScenarioStatus(numRightChoices, numWrongChoices) {
		numRightChoices = numRightChoices || 0;
		numWrongChoices = numWrongChoices || 0;
		$scope.activeScenario.status.custom = {
			selectedFoods: $scope.selectedFoods,
			numRightChoices: numRightChoices,
			numWrongChoices: numWrongChoices,
			pointsPerRightChoice: POINTS_PER_RIGHT_CHOICE,
			pointsPerWrongChoice: POINTS_PER_WRONG_CHOICE
		};
	}

	function calculateScore() {
		var highKSelections = [];
		var lowKSelections = [];
		for (var i = 0; i < $scope.selectedFoods.length; i++) {
			var food = $scope.selectedFoods[i];
			if (food) {
				switch (food.kLevel) {
					case 1:
						highKSelections.push(food);
						break;
					case 3:
						lowKSelections.push(food);
						break;
				}
			}
		}

		var numWrongChoices = Math.abs($scope.activeChallenge.highK - highKSelections.length);// + Math.abs($scope.activeChallenge.lowK - lowKSelections.length);
		var numRightChoices = (highKSelections.length + lowKSelections.length) - numWrongChoices;

		var scoreChange = (numWrongChoices * POINTS_PER_WRONG_CHOICE) + (numRightChoices * POINTS_PER_RIGHT_CHOICE);
		var outcome = 'good';
		if (numWrongChoices > 0) {
			outcome = 'bad';
		}

		console.log('high k choices: ' + highKSelections.length + '/' + $scope.activeChallenge.highK + ', low k choices: ' + lowKSelections.length + '/' + $scope.activeChallenge.lowK);
		console.log('num wrong choices: ' + numWrongChoices + ', num right choices: ' + numRightChoices);
		console.log('outcome: ' + outcome);
		// $scope.activeScenario.status.canSubmit = (numRightChoices + numWrongChoices >= NUM_SELECTED_FOODS);
		$scope.activeScenario.status.scoreChange = scoreChange;
		$scope.activeScenario.status.outcome = outcome;
		$scope.activeScenario.status.custom = {
			selectedFoods: $scope.selectedFoods,
			numWrongChoices: numWrongChoices,
			numRightChoices: numRightChoices,
			pointsPerRightChoice: POINTS_PER_RIGHT_CHOICE,
			pointsPerWrongChoice: POINTS_PER_WRONG_CHOICE
		};

		var remainingFoods = getRemainingFoods();
		var numRemainingFoods = remainingFoods.length;



		/// DEBUG
		var numLow = 0;
		var numHigh = 0;
		_.each($scope.buffetFoods, function(food) {
			if (food !== null && food !== undefined) {
				if (food.kLevel === 1) {
					numHigh++;
				} else {
					numLow++;
				}
			}
		});
		console.log('remaining: low=' + numLow + ', high=' + numHigh);
		/// END DEBUG



		var firstKLevel = null;
		var multipleKLevels = false;
		if ($scope.activeScenario.status.outcome === 'good' && numRemainingFoods <= NUM_SELECTED_FOODS) {
			// Special rules for when there are only 1 or 2 foods left
			_.each(remainingFoods, function(remainingFood) {
				if (firstKLevel === null) {
					firstKLevel = remainingFood.kLevel;
				}
				if (remainingFood.kLevel !== firstKLevel) {
					multipleKLevels = true;
				}
			});
			// If both remaining foods are the same K type, we're done
			if (!multipleKLevels) {
				$scope.activeScenario.status.scoreChange += (numRemainingFoods * POINTS_PER_RIGHT_CHOICE);
				$scope.activeScenario.status.complete = true;
			} else {
				$scope.activeScenario.status.complete = false;
			}
		} else {
			$scope.activeScenario.status.complete = ($scope.activeScenario.status.outcome === 'good' && numRemainingFoods === 0);
		}
	}

	function onDragStartBuffet(event) {
		// console.log('startDragFoodFromBuffet');
		var foodId = angular.element(event.target).data('id');
		draggedFood = _.find($scope.buffetFoods, { id: foodId });
	}

	function onDragStartPlate(event) {
		// console.log('startDragFoodFromPlate');
		var foodId = angular.element(event.target).data('id');
		draggedFood = _.find($scope.selectedFoods, { id: foodId });
	}

	function onDragOver(event) {
		// console.log('foodEnterPlate');
		event.preventDefault();
	}

	function onPlateDrop(event) {
		if (!canSelectMoreFoods()) {
			$scope.$apply(function() {
				$rootScope.showMessage({
					type: 'warning',
					text: 'You cannot put more than ' + (singleItemRules ? 1 : NUM_SELECTED_FOODS) + ' items on the plate.'
				});
			});
		} else if (!_.contains($scope.selectedFoods, draggedFood)) {
			$scope.$apply(function() {
				$rootScope.hideMessage('warning');
				var targetIndex = _.findIndex($scope.selectedFoods, function(selectedFood) {
					return !selectedFood;
				});
				if (targetIndex >= 0) {
					var sourceIndex = _.findIndex($scope.buffetFoods, { id: draggedFood.id });
					$scope.buffetFoods[sourceIndex] = null;

					$scope.selectedFoods[targetIndex] = draggedFood;

					transferFood(draggedFood, onDragStartPlate);
					draggedFood = null;
				}
				
				// console.log('dropFoodOnPlate');
				event.preventDefault();
				calculateScore();
			});
		}
	}

	function onBuffetDrop(event) {
		if (!_.contains($scope.buffetFoods, draggedFood)) {
			$scope.$apply(function() {
				// alert("ondrop");
				var foodIndex = angular.element(event.target).data('location-id');

				if (foodIndex !== null && foodIndex !== undefined) {

					var sourceIndex = _.findIndex($scope.selectedFoods, { id: draggedFood.id });
					$scope.selectedFoods[sourceIndex] = null;

					$scope.buffetFoods[foodIndex] = draggedFood;

					transferFood(draggedFood, onDragStartBuffet);
					draggedFood = null;
				}

				// console.log('dropFoodOnBuffet');
				event.preventDefault();
				calculateScore();
			});
		}
	}

	function transferFood(food, onDragStartCallback) {
		$timeout(function() {
			angular.element('.food-card[data-id="' + food.id + '"]').on('dragstart', onDragStartCallback);
		}, 0);
	}

	function canSelectMoreFoods() {
		var numSelectedFoods = countSelectedFoods();
		var maxSelectedFoods = singleItemRules ? 1 : NUM_SELECTED_FOODS;
		return numSelectedFoods < maxSelectedFoods;
	}

	function countSelectedFoods() {
		var numSelectedFoods = 0;
		_.each($scope.selectedFoods, function(selectedFood) {
			if (selectedFood) {
				numSelectedFoods++;
			}
		});
		return numSelectedFoods;
	}

	function getRemainingFoods() {
		return _.filter($scope.buffetFoods, function(food) {
			return food !== null && food !== undefined;
		}) || [];
	}
});
