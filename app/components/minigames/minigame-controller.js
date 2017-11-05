'use strict';

angular.module('CoumadinApp').controller('MinigameController', function($scope, $rootScope, $location, minigameConfig, _) {
	console.log('minigame controller loading');
	$scope.minigame = minigameConfig.name;
	console.log('minigame = ' + $scope.minigame);
	$scope.scenarios = minigameConfig.scenarios;
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
		$rootScope.userData.score += $scope.activeScenario.status.scoreChange;
	}

	function startScenario() {
		$scope.hideOverlay();
		$scope.activeScenario = {
			config: $scope.scenarios[activeScenarioIndex],
			status: {
				outcome: 'good',
				message: '',
				scoreChange: 0
			}
		};
		$scope.showIntroOverlay();
	}

	function resumeScenario() {
		console.log('triggering scenario resume');
		var priorStatus = $scope.activeScenario.status;
		startScenario();
		$rootScope.$broadcast('minigame:scenario:resume', priorStatus);
	}

	function restartScenario() {
		console.log('triggering scenario restart');
		startScenario();
		$rootScope.$broadcast('minigame:scenario:restart');
	}

	var navigation = {
		start: $scope.hideOverlay,
		resume: resumeScenario,
		retry: restartScenario,
		next: $scope.goToNextScenario
	};

	$scope.showIntroOverlay = function() {
		$rootScope.showOverlay('/components/scenarios/scenario-intro.html', 'ScenarioIntroController', $scope.activeScenario, navigation);
	};

	$scope.showOutroOverlay = function() {
		completeScenario();
		$rootScope.showOverlay('/components/scenarios/scenario-outro.html', 'ScenarioOutroController', $scope.activeScenario, navigation);
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