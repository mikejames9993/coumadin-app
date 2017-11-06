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
			refreshScenario();
			showCoumadinOverlay();
		} else {
			// go back to landing page
			$rootScope.goToLanding();
		}
	};

	function completeScenario() {
		$rootScope.userData.score += $scope.activeScenario.status.scoreChange;
	}

	function refreshScenario() {
		$scope.activeScenario = {
			config: $scope.scenarios[activeScenarioIndex],
			status: {
				complete: false,
				canSubmit: false,
				outcome: 'good',
				message: '',
				scoreChange: 0
			}
		};
	}

	function resumeScenario() {
		console.log('triggering scenario resume');
		var priorStatus = $scope.activeScenario.status;
		$scope.hideOverlay();
		// refreshScenario();
		$rootScope.$broadcast('minigame:scenario:resume', priorStatus);
	}

	function restartScenario() {
		console.log('triggering scenario restart');
		$scope.hideOverlay();
		refreshScenario();
		$rootScope.$broadcast('minigame:scenario:restart');
	}

	function showRulesOverlay() {
		$rootScope.hideOverlay();
		$rootScope.showOverlay('/components/scenarios/scenario-rules.html', 'ScenarioRulesController', $scope.activeScenario, navigation);
	}

	function showCoumadinOverlay() {
		$rootScope.hideOverlay();
		$rootScope.showOverlay('/components/scenarios/scenario-coumadin.html', 'ScenarioCoumadinController', $scope.activeScenario, navigation);
	}

	function showOutroOverlay() {
		completeScenario();
		$rootScope.hideOverlay();
		if ($scope.activeScenario.status.complete) {
			$rootScope.showOverlay('/components/scenarios/scenario-trophy.html', 'ScenarioTrophyController', $scope.activeScenario, navigation);
		} else {
			$rootScope.showOverlay('/components/scenarios/scenario-outro.html', 'ScenarioOutroController', $scope.activeScenario, navigation);
		}
	}

	function hideOverlay() {
		$rootScope.hideOverlay();
	}

	var navigation = {
		showCoumadinInfo: showCoumadinOverlay, // show coumadin info
		showRules: showRulesOverlay, // show rules
		start: $scope.hideOverlay, // show game
		resume: resumeScenario, // show game and pick up at previous point
		retry: restartScenario, // show game and start over
		next: $scope.goToNextScenario // go to landing page
	};

	$scope.showOutro = showOutroOverlay;
	$scope.showRules = showRulesOverlay;
	// $scope.showInfo = showInfoOverlay;

	// Initialize the first scenario
	if ($scope.hasNextScenario()) {
		$scope.goToNextScenario();
	} else {
		$scope.errorMessage = 'No Scenarios Found';
	}

});