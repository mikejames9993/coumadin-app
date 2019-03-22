'use strict';

var SCREENS = {
	COUMADIN: 'coumadin',
	RULES: 'rules',
	GAME: 'game',
	RESULTS: 'results'
};

angular.module('CoumadinApp').controller('MinigameController', function($scope, $rootScope, $location, minigameConfig, _) {
	console.log('minigame controller loading');
	$scope.minigame = minigameConfig.name;
	console.log('minigame = ' + $scope.minigame);
	$scope.scenarios = minigameConfig.scenarios;
	$scope.errorMessage = null;
	$rootScope.viewInfo = null;
	$scope.gameTrackingData = null;

	var activeScenarioIndex = -1;
	$scope.activeScreen = null;

	var moreInfoEventHandle = $rootScope.$on('minigame:scenario:moreInfo', function(event, priorStatus) {
		if ($scope.activeScenario.config.overrideMoreInfo) {
			//$rootScope.showOverlay('/components/scenarios/' + $scope.activeScenario.config.id + '/more-info-' + $scope.activeScreen.toLowerCase() + '.html', 'CoumadinInfoOverrideController', {}, {});
			$rootScope.showCoumadinInfoOverrideOverlay('/components/scenarios/more-info-override.html', 'CoumadinInfoOverrideController', { infos: $scope.activeScenario.config.moreInfoText[$scope.activeScreen.toLowerCase()] }, {});
		}
	});
	var endEventHandle = $rootScope.$on('minigame:scenario:end', function(event) {  // fired when game is over (some games)
		submitGameTrackingData();
	});

	$scope.$on("$destroy", function() {
		submitGameTrackingData();

		// deregister event listeners when this controller is destroyed
        moreInfoEventHandle();
        endEventHandle();
    });

    function initGameTrackingData() {
    	console.log('init tracking');
		var startTime = new Date();
		$scope.gameTrackingData = {
			gameId: '' + startTime.getTime() + Math.abs(generateHash('' + $rootScope.username)),
			gameName: $scope.activeScenario.config.name,
			username: $rootScope.username,
			timeStarted: startTime.getTime(),
			elapsedTimeSeconds: null,
			score: 0,
			outcome: null,
			customFields: []
		};
		$scope.activeScenario.customTrackingFields = {};
    }

    function submitGameTrackingData() {
    	if ($scope.gameTrackingData) {
			//$rootScope.$broadcast('minigame:scenario:restart');
			var endTime = new Date();
			$scope.gameTrackingData.timeFinished = endTime.getTime();
			$scope.gameTrackingData.elapsedTimeSeconds = Math.floor(($scope.gameTrackingData.timeFinished - $scope.gameTrackingData.timeStarted) / 1000);
			$scope.gameTrackingData.score = $scope.activeScenario.scoreChange;
			if ($scope.activeScenario.status.complete === true) {
				$scope.gameTrackingData.outcome = $scope.activeScenario.status.outcome === 'good' ? 'WIN' : 'LOSE';
			} else {
				$scope.gameTrackingData.outcome = 'INCOMPLETE';
			}
			if ($scope.gameTrackingData.username === null || $scope.gameTrackingData.username === undefined) {
				$scope.gameTrackingData.username = $rootScope.username;
			}
			_.each($scope.activeScenario.customTrackingFields, function(fieldValue, fieldLabel) {
				$scope.gameTrackingData.customFields.push({
					label: fieldLabel,
					value: fieldValue
				});
			});
			$rootScope.gamesDatabase.child($scope.gameTrackingData.gameId).set($scope.gameTrackingData);
			$scope.gameTrackingData = null;
		}
    }

    function generateHash(string) {
		var hash = 0;
		var i;
		var chr;
		for (i = 0; i < string.length; i++) {
			chr = string.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
    }

	$scope.hasNextScenario = function() {
		return activeScenarioIndex < ($scope.scenarios.length - 1);
	};

	$scope.goToNextScenario = function() {
		$scope.hideOverlay();
		if ($scope.hasNextScenario()) {
			// transition to the next scenario
			activeScenarioIndex++;
			refreshScenario();
			$scope.activeScreen = SCREENS.COUMADIN;
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
				outcome: 'good',
				message: '',
				scoreChange: 0
			},
			customTrackingFields: {},
			testSubmit: function() {
				// return null (no error) by default
				return null;
			},
			footerReset: function() {
				// do nothing by default
			}
		};
		if ($scope.activeScenario.config.overrideMoreInfo) {
			$rootScope.suppressDefaultMoreInfo = true;
		}
	}

	function resumeScenario() {
		console.log('triggering scenario resume');
		var priorStatus = $scope.activeScenario.status;
		$scope.activeScreen = SCREENS.GAME;
		$scope.hideOverlay();
		$rootScope.$broadcast('minigame:scenario:resume', priorStatus);
	}

	function restartScenario() {
		// track some statistical data
		submitGameTrackingData();
		initGameTrackingData();
		
		console.log('triggering scenario restart');
		$scope.hideOverlay();
		refreshScenario();
		$rootScope.$broadcast('minigame:scenario:restart');
		$scope.activeScreen = SCREENS.GAME;
	}

	function showRulesOverlay() {
		$scope.activeScreen = SCREENS.RULES;
		$rootScope.hideOverlay();
		$rootScope.showOverlay('/components/scenarios/scenario-rules.html', 'ScenarioRulesController', $scope.activeScenario, navigation);
	}

	function showCoumadinOverlay() {
		$scope.activeScreen = SCREENS.COUMADIN;
		$rootScope.hideOverlay();
		$rootScope.showOverlay('/components/scenarios/scenario-coumadin.html', 'ScenarioCoumadinController', $scope.activeScenario, navigation);
	}

	function showOutroOverlay() {
		var submitErrorMessage = $scope.activeScenario.testSubmit();
		console.log('submit err = ' + submitErrorMessage);
		if (submitErrorMessage) {
			$rootScope.showMessage({
				type: 'warning',
				text: submitErrorMessage
			});
		} else {
			$rootScope.hideMessage();
			completeScenario();
			$rootScope.hideOverlay();
			if ($scope.activeScenario.status.complete) {
				$scope.activeScreen = SCREENS.RESULTS;
				$rootScope.showOverlay('/components/scenarios/scenario-trophy.html', 'ScenarioTrophyController', $scope.activeScenario, navigation);
			} else {
				$scope.activeScreen = SCREENS.RESULTS;
				$rootScope.showOverlay('/components/scenarios/scenario-outro.html', 'ScenarioOutroController', $scope.activeScenario, navigation);
			}
		}
	}

	function startGame() {
		$scope.activeScreen = SCREENS.GAME;
		$rootScope.hideOverlay();
		initGameTrackingData();
		$rootScope.$broadcast('minigame:scenario:start');
	}

	var navigation = {
		showCoumadinInfo: showCoumadinOverlay, // show coumadin info
		showRules: showRulesOverlay, // show rules
		start: startGame, // show game
		resume: resumeScenario, // show game and pick up at previous point
		retry: restartScenario, // show game and start over
		next: $scope.goToNextScenario // go to landing page
	};
	$scope.navigation = navigation;

	$scope.showOutro = showOutroOverlay;
	// $scope.completeVitaminKGame = showOutroOverlay;
	$scope.showRules = showRulesOverlay;

	// Initialize the first scenario
	if ($scope.hasNextScenario()) {
		$scope.goToNextScenario();
	} else {
		$scope.errorMessage = 'No Scenarios Found';
	}
});
