'use strict';

var NUM_GAME_FOODS = 10;
var NUM_SELECTED_FOODS = 2;

angular.module('CoumadinApp').controller('DietController', function($rootScope, $scope, $timeout, _) {
	console.log('diet controller loading');

	$scope.buffetFoods = [];
	$scope.selectedFoods = [];

	for (var i = 0; i < NUM_GAME_FOODS; i++) {
		$scope.buffetFoods.push(null);
	}
	for (var i = 0; i < NUM_SELECTED_FOODS; i++) {
		$scope.selectedFoods.push(null);
	}

	var draggedFood = null;

	initScenario();

	function initScenario() {
		var gameFoods = _.first(_.shuffle($scope.activeScenario.config.foodItems), NUM_GAME_FOODS);
		for (var i = 0; i < gameFoods.length; i++) {
			$scope.buffetFoods[i] = _.extend({}, gameFoods[i], { expanded: false });
		}

		$timeout(function() {
			console.log('foods: ' + angular.element('.food-card').length);
			angular.element('.buffet-drop-zone .food-card').on('dragstart', onDragStartBuffet);
			angular.element('.plate-drop-zone .food-card').on('dragstart', onDragStartPlate);
		}, 100);
	}

	$timeout(function() {
		angular.element('.plate-drop-zone, .buffet-drop-zone').on('dragover', onDragOver);
		angular.element('.plate-drop-zone').on('drop', onPlateDrop);
		angular.element('.buffet-drop-zone').on('drop', onBuffetDrop);
	}, 0);

	function calculateScore() {

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
		if (canSelectMoreFoods()) {
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
