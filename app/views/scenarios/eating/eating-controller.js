'use strict';

angular.module('CoumadinApp').controller('EatingController', function($scope, $rootScope, $timeout, _) {
	console.log('eating controller loading');

	$scope.buffetFoods = _.first(_.shuffle($scope.activeScenario.config.foodItems), 8);
	$scope.selectedFoods = [];

	var draggedFood = null;

	function onDragStartBuffet(event) {
		console.log('startDragFoodFromBuffet');
		var name = angular.element(event.target).data('name');
		draggedFood = _.find($scope.buffetFoods, { name: name });
	}

	function onDragStartPlate(event) {
		console.log('startDragFoodFromPlate');
		var name = angular.element(event.target).data('name');
		draggedFood = _.find($scope.selectedFoods, { name: name });
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
		});
	}

	function onBuffetDrop(event) {
		$scope.$apply(function() {
			// alert("ondrop");
			transferFood(draggedFood, $scope.selectedFoods, $scope.buffetFoods, onDragStartBuffet);
			draggedFood = null;
			console.log('dropFoodOnBuffet');
			event.preventDefault();
		});
	}

	$timeout(function() {
		console.log('foods: ' + angular.element('.food-card').length);
		angular.element('#buffet-region .food-card').on('dragstart', onDragStartBuffet);
		angular.element('#plate-region .food-card').on('dragstart', onDragStartPlate);

		angular.element('#plate-region, #buffet-region').on('dragover', onDragOver);

		angular.element('#plate-region').on('drop', onPlateDrop);

		angular.element('#buffet-region').on('drop', onBuffetDrop);
	}, 0);

	function transferFood(food, sourceArray, targetArray, onDragStartCallback) {
		if (food && !_.contains(targetArray, food)) {
			// add food to target array
			targetArray.push(food);

			// remove food from source array
			for (var i = 0; i < sourceArray.length; i++) {
				if (sourceArray[i].name === food.name) {
					sourceArray.splice(i, 1);
				}
			}

			$timeout(function() {
				angular.element('.food-card[data-name="' + food.name + '"]').on('dragstart', onDragStartCallback);
			});
		}
	}
});
