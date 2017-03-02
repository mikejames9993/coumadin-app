'use strict';

angular.module('CoumadinApp').controller('MinigameController', function($scope, $rootScope, $location, minigameConfig, _) {
	console.log('minigame controller loading');
	$scope.minigame = minigameConfig.name;
	console.log('minigame = ' + $scope.minigame);
	$scope.scenarios = minigameConfig.scenarios;
	console.log('scenarios: ' + JSON.stringify($scope.scenarios));
	$scope.foodItems = _.shuffle(minigameConfig.foodItems);
	console.log('foodItems: ' + JSON.stringify($scope.foodItems));
	$scope.errorMessage = null;

	var activeScenarioIndex = -1;

	console.log("user data: " + JSON.stringify($rootScope.user));

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
			$rootScope.goToLanding();
		}
	};

	function completeScenario() {
		$rootScope.userData.score += $scope.activeScenario.data.scoreChange;
	};

	function startScenario() {
		$scope.hideOverlay();
		$scope.activeScenario = {
			config: $scope.scenarios[activeScenarioIndex],
			data: {
				outcome: 'good',
				message: 'Good Choices!',
				scoreChange: 100
			}
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
		completeScenario();
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
