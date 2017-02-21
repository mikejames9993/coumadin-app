'use strict';

angular.module('CoumadinApp').controller('MinigameController', function($scope, $location, minigameConfig) {
	console.log('minigame controller loading');
	$scope.minigame = minigameConfig.name;
	console.log('minigame = ' + $scope.minigame);
	$scope.scenarios = minigameConfig.scenarios;
	console.log('scenarios: ' + JSON.stringify($scope.scenarios));
	$scope.errorMessage = null;

	var activeScenarioIndex = -1;

	$scope.hasNextScenario = function() {
		return activeScenarioIndex < ($scope.scenarios.length - 1);
	};

	$scope.goToNextScenario = function() {
		if ($scope.hasNextScenario()) {
			// transition to the next scenario
			activeScenarioIndex++;
			$scope.activeScenario = $scope.scenarios[activeScenarioIndex];
		} else {
			// go back to landing page
			$location.url('/landing');
		}
	};

	$scope.hideOverlay = function() {
		
	};

	// Initialize the first scenario
	if ($scope.hasNextScenario()) {
		$scope.goToNextScenario();
	} else {
		$scope.errorMessage = 'No Scenarios Found';
	}
});
