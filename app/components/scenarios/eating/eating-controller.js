'use strict';

angular.module('CoumadinApp').controller('EatingController', function($rootScope, $scope, $timeout, _) {
	console.log('eating controller loading');
	// $rootScope.viewInfo = 'These food items contain varying amounts of Vitamin K. ' +
	// 	'Make your dinner plate by dragging and dropping the food item on your plate. ' +
	// 	'You can tap the food icon to display the name and for more information about the food';
	// $rootScope.viewInfo = minigameConfig.helpText;
	$rootScope.viewInfo = "Drag the foods down onto your plate";

	$scope.buffetFoods = [];
	$scope.selectedFoods = [];

	var draggedFood = null;
	var expandedFood = null;

	$rootScope.$on('minigame:scenario:restart', initScenario);

	initScenario();

	function initScenario() {
		$scope.activeScenario.data.scoreChange = 0;
		$scope.buffetFoods = [];
		$scope.selectedFoods = [];

		var gameFoods = _.first(_.shuffle($scope.activeScenario.config.foodItems), 8);
		for (var i = 0; i < gameFoods.length; i++) {
			$scope.buffetFoods.push(_.extend({}, gameFoods[i], { expanded: false }));
		}

		$timeout(function() {
			console.log('foods: ' + angular.element('.food-card').length);
			angular.element('#buffet-region .food-card').on('dragstart', onDragStartBuffet);
			angular.element('#plate-region .food-card').on('dragstart', onDragStartPlate);
		}, 0);

		draggedFood = null;
		expandedFood = null;

		calculateScore();
	}

	$timeout(function() {
		angular.element('#plate-region, #buffet-region').on('dragover', onDragOver);
		angular.element('#plate-region').on('drop', onPlateDrop);
		angular.element('#buffet-region').on('drop', onBuffetDrop);
	}, 0);

	$scope.expandFood = function(food) {
		$timeout(function() {
			food.expanded = true;
			$timeout(function() {
				angular.element('.food-card[data-id="' + food.id + '"]').parent('.food-item-wrapper').find('.food-card-expand').focus();
			}, 0)
		}, 50);
	};

	$scope.collapseFood = function(food) {
		food.expanded = false;
	};

	function calculateScore() {
		var highKSelections = [];
		var mediumKSelections = [];
		for (var i = 0; i < $scope.selectedFoods.length; i++) {
			var food = $scope.selectedFoods[i];
			switch (food.kLevel) {
				case 1:
					highKSelections.push(food);
					break;
				case 2:
					mediumKSelections.push(food);
					break;
			}
		}

		// Selections are ok if:
		//  - number of high-k foods is 1 and number of medium-k foods is <= 2
		//  - number of high-k foods is 0 and number of medium-k foods is <= 3
		var scoreChange;
		var outcome;
		var message = '';
		if ($scope.selectedFoods.length > 0) {
			if ((highKSelections.length === 1 && mediumKSelections.length <= 2) || (highKSelections.length === 0 && mediumKSelections.length <= 3)) {
				scoreChange = 200;
				outcome = 'good';
				message = 'Good choices! You selected ' + getFoodCountLabel($scope.selectedFoods.length) + ' and you are safely below the Vitamin K limit.';
			} else {
				scoreChange = -200;
				outcome = 'bad';
				if (highKSelections.length > 0 && mediumKSelections.length > 0) {
					message = 'You selected ' + getFoodCountLabel(highKSelections.length) + ' with high Vitamin K and ' + mediumKSelections.length + ' with medium Vitamin K levels. This could result in unsafe levels of Vitamin K in your system!';
				} else if (highKSelections.length > 0) {
					message = 'You selected ' + getFoodCountLabel(highKSelections.length) + ' with high Vitamin K. This could result in unsafe levels of Vitamin K in your system!';
				} else if (mediumKSelections.length > 0) {
					message = 'You selected ' + getFoodCountLabel(mediumKSelections.length) + ' with medium Vitamin K levels. This could result in unsafe levels of Vitamin K in your system!';
				}
			}
		} else {
			scoreChange = 0;
			outcome = 'good';
			message = 'You did not select any foods.';
		}
		$scope.activeScenario.data.scoreChange = scoreChange;
		$scope.activeScenario.data.outcome = outcome;
		$scope.activeScenario.data.message = message;
	}

	function getFoodCountLabel(numFoods) {
		return numFoods + ' ' + (numFoods === 1 ? 'food' : 'foods');
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
		$scope.$apply(function() {
			// alert("ondrop");
			transferFood(draggedFood, $scope.buffetFoods, $scope.selectedFoods, onDragStartPlate);
			draggedFood = null;
			console.log('dropFoodOnPlate');
			event.preventDefault();
			calculateScore();
		});
	}

	function onBuffetDrop(event) {
		$scope.$apply(function() {
			// alert("ondrop");
			transferFood(draggedFood, $scope.selectedFoods, $scope.buffetFoods, onDragStartBuffet);
			draggedFood = null;
			console.log('dropFoodOnBuffet');
			event.preventDefault();
			calculateScore();
		});
	}

	function transferFood(food, sourceArray, targetArray, onDragStartCallback) {
		if (food && !_.contains(targetArray, food)) {
			// add food to target array
			targetArray.push(food);

			// remove food from source array
			for (var i = 0; i < sourceArray.length; i++) {
				if (sourceArray[i].id === food.id) {
					sourceArray.splice(i, 1);
				}
			}

			$timeout(function() {
				angular.element('.food-card[data-id="' + food.id + '"]').on('dragstart', onDragStartCallback);
			}, 0);
		}
	}
});