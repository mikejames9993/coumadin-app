'use strict';

angular.module('CoumadinApp').controller('EatingController', function($rootScope, $scope, $timeout, _) {
	console.log('eating controller loading');
	$rootScope.viewInfo = "Drag the items down to the plate";

	$scope.buffetFoods = _.first(_.shuffle($scope.activeScenario.config.foodItems), 8);
	$scope.selectedFoods = [];

	var draggedFood = null;

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
				if (sourceArray[i].id === food.id) {
					sourceArray.splice(i, 1);
				}
			}

			$timeout(function() {
				angular.element('.food-card[data-id="' + food.id + '"]').on('dragstart', onDragStartCallback);
			});
		}
	}
});
