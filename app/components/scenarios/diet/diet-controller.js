'use strict';

var NUM_GAME_FOODS = 10;
var NUM_SELECTED_FOODS = 2;

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

	var draggedFood = null;

	$rootScope.$on('minigame:scenario:restart', initScenario);
	$rootScope.$on('minigame:scenario:resume', function(event, priorStatus) {
		resumeScenario(priorStatus);
	});

	initScenario();

	function initScenario() {
		// Select foods at random
		var gameFoods = _.first(_.shuffle($scope.activeScenario.config.foodItems), NUM_GAME_FOODS);
		for (var i = 0; i < gameFoods.length; i++) {
			$scope.buffetFoods[i] = _.extend({}, gameFoods[i], { expanded: false });
		}

		// Select a random challenge scenario
		selectChallenge();
		clearSelectedFoods();

		$timeout(function() {
			console.log('foods: ' + angular.element('.food-card').length);
			angular.element('.buffet-drop-zone .food-card').on('dragstart', onDragStartBuffet);
			angular.element('.plate-drop-zone .food-card').on('dragstart', onDragStartPlate);
		}, 100);

		draggedFood = null;
	}

	function resumeScenario(priorStatus) {
		console.log('resuming after ' + priorStatus.outcome + ' outcome');
		// If player was successful, pick a new challenge and remove prior selected items from play
		if (priorStatus.outcome === 'good') {
			selectChallenge();
			_.each($scope.selectedFoods, function(selectedFood) {
				var index = _.findIndex($scope.buffetFoods, { id: selectedFood.id });
				$scope.buffetFoods[index] = null;
			});
			clearSelectedFoods();
		}
	}

	function selectChallenge() {
		$scope.activeChallenge = _.shuffle(challenges)[0];
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

		var scoreChange = (numWrongChoices * -100) + (numRightChoices * 100);
		var outcome = 'good';
		if (numWrongChoices > 0) {
			outcome = 'bad';
		}

		console.log('high k choices: ' + highKSelections.length + '/' + $scope.activeChallenge.highK + ', low k choices: ' + lowKSelections.length + '/' + $scope.activeChallenge.lowK);
		console.log('num wrong choices: ' + numWrongChoices + ', num right choices: ' + numRightChoices);
		console.log('outcome: ' + outcome);
		$scope.activeScenario.status.scoreChange = scoreChange;
		$scope.activeScenario.status.outcome = outcome;
	}

	function onDragStartBuffet(event) {
		console.log('startDragFoodFromBuffet');
		var foodId = angular.element(event.target).data('id');
		draggedFood = _.find($scope.buffetFoods, { id: foodId });
	}

	function onDragStartPlate(event) {
		console.log('startDragFoodFromPlate');
		var foodId = angular.element(event.target).data('id');
		draggedFood = _.find($scope.selectedFoods, { id: foodId });
	}

	function onDragOver(event) {
		console.log('foodEnterPlate');
		event.preventDefault();
	}

	function onPlateDrop(event) {
		if (canSelectMoreFoods() && !_.contains($scope.selectedFoods, draggedFood)) {
			$scope.$apply(function() {
				// alert("ondrop");
				var targetIndex = _.findIndex($scope.selectedFoods, function(selectedFood) {
					return !selectedFood;
				});
				if (targetIndex >= 0) {
					var sourceIndex = _.findIndex($scope.buffetFoods, { id: draggedFood.id });
					$scope.buffetFoods[sourceIndex] = null;

					$scope.selectedFoods[targetIndex] = draggedFood;

					transferFood(draggedFood, $scope.buffetFoods, $scope.selectedFoods, onDragStartPlate);
					draggedFood = null;
				}
				
				console.log('dropFoodOnPlate');
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

					transferFood(draggedFood, $scope.selectedFoods, $scope.buffetFoods, onDragStartBuffet);
					draggedFood = null;
				}

				console.log('dropFoodOnBuffet');
				event.preventDefault();
				calculateScore();
			});
		}
	}

	function transferFood(food, sourceArray, targetArray, onDragStartCallback) {
		// if (food && !_.contains(targetArray, food)) {
			// add food to target array
			// targetArray.push(food);

			// // remove food from source array
			// for (var i = 0; i < sourceArray.length; i++) {
			// 	if (sourceArray[i].id === food.id) {
			// 		sourceArray.splice(i, 1);
			// 	}
			// }

			$timeout(function() {
				angular.element('.food-card[data-id="' + food.id + '"]').on('dragstart', onDragStartCallback);
			}, 0);
		// }
	}

	function canSelectMoreFoods() {
		var canSelectMore = false;
		_.each($scope.selectedFoods, function(selectedFood) {
			if (!selectedFood) {
				canSelectMore = true;
			}
		});
		return canSelectMore;
	}
});
