'use strict';

angular.module('CoumadinApp').controller('MinigameController', function($scope, $rootScope, $location, minigameConfig) {
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
		$scope.hideOverlay();
		if ($scope.hasNextScenario()) {
			// transition to the next scenario
			activeScenarioIndex++;
			startScenario();
		} else {
			// go back to landing page
			$location.url('/landing');
		}
	};

	function startScenario() {
		$scope.hideOverlay();
		$scope.activeScenario = {
			config: $scope.scenarios[activeScenarioIndex],
			data: {}
		};
		$scope.showIntroOverlay();
	};

	var navigation = {
		start: $scope.hideOverlay,
		retry: startScenario,
		next: $scope.goToNextScenario
	};

	$scope.showIntroOverlay = function() {
		$rootScope.showOverlay('/views/scenarios/scenario-intro.html', 'ScenarioIntroController', $scope.activeScenario, navigation);
	};

	$scope.showOutroOverlay = function() {
		$rootScope.showOverlay('/views/scenarios/scenario-outro.html', 'ScenarioOutroController', $scope.activeScenario, navigation);
	};

	$scope.hideOverlay = function() {
		$rootScope.hideOverlay();
	};

	// Initialize the first scenario
	if ($scope.hasNextScenario()) {
		$scope.goToNextScenario();
	} else {
		$scope.errorMessage = 'No Scenarios Found';
	}
});
