'use strict';

var NUM_GAME_FOODS = 17;//THATS HOW MANY FOODS WE HAVE
var POINTS_PER_RIGHT_CHOICE = 1;
var POINTS_PER_WRONG_CHOICE = 0;
var GOAL = 10;
var STANDARD_BG_IMAGE = "../../images/weird-guy/thinking-idea-guy.jpg";
var CORRECT_BG_IMAGE = "../../images/weird-guy/happy-guy.jpg";
var WRONG_BG_IMAGE = "../../images/weird-guy/bored-guy.jpg"
var CHAMPION_BG_IMAGE = "../../images/weird-guy/champion-guy.jpg";
var SECONDS_PER_GAME = 600; // 10 minutes
var SECONDS_PER_SELECTION = 60; // 1 minute
var FEEDBACK_DISPLAY_INTERVAL_SECONDS = 4; // 4 seconds
var FEEDBACK_MESSAGE_RIGHT = "You did it! You earned 1 point!";
var FEEDBACK_MESSAGE_WRONG = "That's not right. Let's try another one";
var NUM_FOODS_SELECTED_LBL = "Foods Selected";
var NUM_RIGHT_FOODS_SELECTED_LBL = "Correct Foods Selected";
var NUM_WRONG_FOODS_SELECTED_LBL = "Wrong Foods Selected";
var TOTAL_SKIPS_LBL = "Total Skips";
var TOTAL_RETRIES_LBL = "Total Retries";


angular.module('CoumadinApp').controller('VitaminKController', function($rootScope, $scope, $timeout, $interval, $filter, $uibModal, _) {
	console.log('vitamin K controller loading');
	$scope.counter = 100; 
	$scope.buffetFoods = [];
	$scope.gameSecondsRemaining = SECONDS_PER_GAME;
	$scope.selectionSecondsRemaining = SECONDS_PER_SELECTION;
	$scope.consecutiveSkips = 0;
	$scope.consecutiveRetries = 0;
	$rootScope.activeScenario = "vitamin-k-foods";

	var startEventHandle = $rootScope.$on('minigame:scenario:start', initScenario);
	var restartEventHandle = $rootScope.$on('minigame:scenario:restart', initScenario);
	var evalRetryEventHandle = $rootScope.$on('minigame:scenario:vitk:finalretry', retrySelection);
	var retryEventHandle = $rootScope.$on('minigame:scenario:vitk:retry', evalRetrySelection );
	var evalSkipEventHandle = $rootScope.$on('minigame:scenario:vitk:skip', evalSkipSelection);
	var skipEventHandle = $rootScope.$on('minigame:scenario:vitk:finalskip', skipSelection);
	var dismissFeedbackHandle = $rootScope.$on('minigame:scenario:vitk:dismissfeedback', resetForNextFood);
	var userContinueDecisionHandle = $rootScope.$on('minigame:scenario:vitk:usercontinuedecision', handleUserContinueDecision);

	$scope.$on("$destroy", function() {
		hideModal();
		stopTicker();
		startEventHandle();
		restartEventHandle();
		retryEventHandle();
		evalRetrySelection();
		evalSkipEventHandle();
		skipEventHandle();
		dismissFeedbackHandle();
		userContinueDecisionHandle();
	});

	var gameCountdownActive = false;
	var selectionCountdownActive = false;
	var ticker = null;
	var ctr = 0;
	function startTicker() {
		if (ticker) {
			stopTicker();
		}
		ticker = $interval(function() {
			// if (ctr++ % 10 === 0) {
			// 	console.log('tick');
			// }
			if (gameCountdownActive) {
				console.log('game tick');
				$scope.gameSecondsRemaining--;
				if ($scope.gameSecondsRemaining === 0) {
					stopGameCountdown();
					stopSelectionCountdown();
					endGame();
				}
			}
			if (selectionCountdownActive) {
				$scope.selectionSecondsRemaining--;
				if ($scope.selectionSecondsRemaining === 0) {
					stopSelectionCountdown();
					showTimeExpiredModal();
				}
			}
		}, 1000);
	}
	function stopTicker() {
		if (ticker) {
			$interval.cancel(ticker);
			ticker = null;
		}
	}
	function startGameCountdown() {
		gameCountdownActive = true;
	}
	function stopGameCountdown() {
		gameCountdownActive = false;
	}
	function startSelectionCountdown() {
		selectionCountdownActive = true;
	}
	function stopSelectionCountdown() {
		selectionCountdownActive = false;
	}

    $scope.indexTracker = 0;
    $scope.leftPanelBGImage = STANDARD_BG_IMAGE;
    $scope.selectionMsg = "";
	$rootScope.userData.score = 0;
	$scope.selectionBtnDisabled = false;


	var modalInstance = null;
	function showTimeExpiredModal() {
		stopGameCountdown();
		hideModal();
		modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/components/scenarios/vitamin-k-foods/components/time-expired/time-expired.html',
            controller: 'TimeExpiredController',
            backdrop: 'static',
            resolve: {
                data: function () {
                    return {
                    	enableSkip: $scope.consecutiveSkips < 3,
                    	enableRetry: $scope.consecutiveRetries < 3
                    }
                }
            }
        });
	}
	function showExcessiveSkipsModal() {
		stopGameCountdown();
		hideModal();
		modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/components/scenarios/vitamin-k-foods/components/excessive-skips/excessive-skips.html',
            controller: 'ExcessiveSkipsController',
            backdrop: 'static'
		});
	}
	function showExcessiveRetriesModal() {
		stopGameCountdown();
		hideModal();
		modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/components/scenarios/vitamin-k-foods/components/excessive-retries/excessive-retries.html',
            controller: 'ExcessiveRetriesController',
            backdrop: 'static'
		});
	}
	function showFeedbackModal(feedbackMessage, guyImagePath) {
		hideModal();
		modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/components/scenarios/vitamin-k-foods/components/feedback/feedback.html',
            controller: 'FeedbackController',
            backdrop: 'static',
            resolve: {
                data: function () {
                    return {
                    	feedbackMessage: feedbackMessage,
                    	feedbackImage: guyImagePath
                    }
                }
            }
		});
	}
    function hideModal() {
    	if (modalInstance) {
    		modalInstance.close();
    	}
    }

    function evalRetrySelection() {
    	$scope.consecutiveSkips = 0; //reset
    	if ($scope.consecutiveRetries === 2) {
    		// on the 3rd consecutive retry, display another modal
    		showExcessiveRetriesModal();
    	} else {
    		// otherwise proceed with retry-ing? retring? retrying? the selection
    		retrySelection();
    	}
    }

    function retrySelection() {
    	$scope.consecutiveRetries++;
    	$scope.activeScenario.customTrackingFields[TOTAL_RETRIES_LBL]++;
    	hideModal();
    	resetForCurrentFood();
    	startGameCountdown();
    }

    function evalSkipSelection() {
    	$scope.consecutiveRetries = 0; //reset
    	if ($scope.consecutiveSkips === 2) {
    		// on the 3rd consecutive skip, display another modal
    		showExcessiveSkipsModal();
    	} else {
    		// otherwise proceed with skipping the selection
    		skipSelection();
    	}
    }
    function skipSelection() {
    	$scope.consecutiveSkips++;
    	$scope.activeScenario.customTrackingFields[TOTAL_SKIPS_LBL]++;
    	hideModal();
    	resetForNextFood();
    	startGameCountdown();
    }
	
	$scope.selectionMade = function(selection) {
		stopSelectionCountdown();
		$scope.selectionBtnDisabled = true;
		$scope.consecutiveSkips = 0;
		$scope.consecutiveRetries = 0;

		console.log($scope.currentFoodItem);
		console.log(selection);

		if ($scope.currentFoodItem.kLevel === 1 && selection === 'high' || $scope.currentFoodItem.kLevel === 3 && selection === 'low') {
			correctSelectionMade($scope.currentFoodItem);
		} else {
			incorrectSelectionMade($scope.currentFoodItem);
		}
	}

	var correctSelectionMade = function(selectedFood) {
		
		console.log('Correct');
		$rootScope.userData.score++;
		$scope.activeScenario.scoreChange++;
        $scope.activeScenario.customTrackingFields[NUM_FOODS_SELECTED_LBL]++;
		$scope.activeScenario.customTrackingFields[NUM_RIGHT_FOODS_SELECTED_LBL]++;
        var foodTrackingLabel = getCorrectFoodCustomTrackingLabel(selectedFood);
        $scope.activeScenario.customTrackingFields[foodTrackingLabel]++;

		// $scope.leftPanelBGImage = CORRECT_BG_IMAGE;
    	// $scope.selectionMsg = FEEDBACK_MESSAGE_RIGHT;
    	var currentScore = $scope.activeScenario.scoreChange;

		if (currentScore === 10 || currentScore === 15 || currentScore === 20) {
			console.log('YOU WIN');
			endGame();
			//showTrophyScreen()
			//$rootScope.userData.score = 0; - used if we wanna reset
		} else {
			// $timeout(resetForNextFood, FEEDBACK_DISPLAY_INTERVAL_SECONDS * 1000);
			showFeedbackModal(FEEDBACK_MESSAGE_RIGHT, CORRECT_BG_IMAGE);
		}
		//Could hide / show div's with success screen

		//show info modal with CORRECT bg image for 1.5 sec
	};

	var incorrectSelectionMade = function(selectedFood) {
		
		// //show info modal with wrong bg image for 1.5 sec
        // $scope.leftPanelBGImage = WRONG_BG_IMAGE;
        // $scope.selectionMsg = FEEDBACK_MESSAGE_WRONG;

        //Could hide / show div's with incorrect screen

        $scope.activeScenario.customTrackingFields[NUM_FOODS_SELECTED_LBL]++;
        $scope.activeScenario.customTrackingFields[NUM_WRONG_FOODS_SELECTED_LBL]++;
        var foodTrackingLabel = getIncorrectFoodCustomTrackingLabel(selectedFood);
        $scope.activeScenario.customTrackingFields[foodTrackingLabel]++;
        // $timeout(resetForNextFood, FEEDBACK_DISPLAY_INTERVAL_SECONDS * 1000);
        showFeedbackModal(FEEDBACK_MESSAGE_WRONG, WRONG_BG_IMAGE);
	};

	function handleUserContinueDecision(event, keepPlaying) {
		$rootScope.hideOverlay();
		hideModal();

		if (keepPlaying) {
			resetForNextFood();
		} else {
			endGame(true);
		}
	}

	function resetForCurrentFood() {
		// $scope.leftPanelBGImage = STANDARD_BG_IMAGE;
  //   	$scope.selectionMsg = "";
    	$scope.selectionBtnDisabled = false;
		$scope.selectionSecondsRemaining = SECONDS_PER_SELECTION;
		startSelectionCountdown();
	}

	function resetForNextFood() {
		$rootScope.hideOverlay();
		hideModal();
		if ($scope.indexTracker === (NUM_GAME_FOODS - 1)) {
			$scope.indexTracker = 0;
		} else {
			$scope.indexTracker++;
		}
    	$scope.currentFoodItem = $scope.buffetFoods[$scope.indexTracker];
		resetForCurrentFood();
	}

	for (var i = 0; i < NUM_GAME_FOODS; i++) {
		$scope.buffetFoods.push(null);
	}
	function initScenario() {
		$rootScope.showReplayOptions = true;
		$rootScope.hideOverlay();
		$scope.activeScenario.scoreChange = 0;
		$rootScope.userData.score = 0;
		$scope.gameSecondsRemaining = SECONDS_PER_GAME;
		$scope.selectionSecondsRemaining = SECONDS_PER_SELECTION;
    	$scope.selectionBtnDisabled = false;

    	$scope.activeScenario.customTrackingFields[NUM_FOODS_SELECTED_LBL] = 0;
    	$scope.activeScenario.customTrackingFields[NUM_RIGHT_FOODS_SELECTED_LBL] = 0;
    	$scope.activeScenario.customTrackingFields[NUM_WRONG_FOODS_SELECTED_LBL] = 0;
    	$scope.activeScenario.customTrackingFields[TOTAL_SKIPS_LBL] = 0;
    	$scope.activeScenario.customTrackingFields[TOTAL_RETRIES_LBL] = 0;
    	_.each($scope.activeScenario.config.foodItems, function(food) {
    		var foodCorrectTrackingLabel = getCorrectFoodCustomTrackingLabel(food);
    		var foodIncorrectTrackingLabel = getIncorrectFoodCustomTrackingLabel(food);
    		$scope.activeScenario.customTrackingFields[foodCorrectTrackingLabel] = 0;
    		$scope.activeScenario.customTrackingFields[foodIncorrectTrackingLabel] = 0;
    	});

		// Select foods at random
		$scope.consecutiveSkips = 0;
		$scope.consecutiveRetries = 0;
		var gameFoods = _.first(_.shuffle($scope.activeScenario.config.foodItems), NUM_GAME_FOODS);
		for (var i = 0; i < gameFoods.length; i++) {
			$scope.buffetFoods[i] = _.extend({}, gameFoods[i], { expanded: false });
		}
		$scope.currentFoodItem = $scope.buffetFoods[$scope.indexTracker];
		startTicker();
		startGameCountdown();
    	startSelectionCountdown();
	}

	function getCorrectFoodCustomTrackingLabel(food) {
		return food.name + " Correct Selections";
	}

	function getIncorrectFoodCustomTrackingLabel(food) {
		return food.name + " Incorrect Selections";
	}

	// function showTrophyScreen() {
	// 	$rootScope.activeScenario = "";
	// 	if ($scope.activeScenario.scoreChange >= 10 && $scope.activeScenario.scoreChange <=19) {
	// 		//$rootScope.activeScenario = "";
	// 		hideModal();
	// 		$rootScope.hideOverlay();
	// 		$rootScope.showOverlay('/components/scenarios/vitamin-k-foods/components/game-win/game-win.html', 'VitaminKWinController', $scope.activeScenario, $scope.navigation);
	// 	} else {
	// 		//$rootScope.activeScenario = "";
	// 		$rootScope.goToLanding();
	// 	}
	// }
		

	function endGame(forceEnd) {
		hideModal();
		$rootScope.hideOverlay();

		$scope.activeScenario.status.complete = true;
		if ($scope.activeScenario.scoreChange >= 10) {
			$scope.activeScenario.status.outcome = 'good';
			if ($scope.gameSecondsRemaining > 0 && $scope.activeScenario.scoreChange < 20 && !forceEnd) {
				// still some time left - let the user decide if they want to keep playing
				//$rootScope.showOverlay('/components/scenarios/vitamin-k-foods/components/game-win/game-win.html', 'VitaminKWinController', $scope.activeScenario, null);
				$rootScope.showOverlay('/components/scenarios/vitamin-k-foods/components/game-win-question/game-win-question.html', 'VitaminKWinQuestionController', $scope.activeScenario, $scope.navigation);
			} else {
				$rootScope.$broadcast('minigame:scenario:end');
				if ($scope.activeScenario.scoreChange < 20) {
					// time is up - show the trophy screen
					$rootScope.showOverlay('/components/scenarios/vitamin-k-foods/components/game-win/game-win.html', 'VitaminKWinController', $scope.activeScenario, $scope.navigation);
				} else {
					$rootScope.showReplayOptions = false;
					$rootScope.showOverlay('/components/scenarios/vitamin-k-foods/components/game-win/game-win.html', 'VitaminKWinController', $scope.activeScenario, $scope.navigation);
				}
			}
		} else {
			$scope.activeScenario.status.outcome = 'bad';
			$rootScope.$broadcast('minigame:scenario:end');
			$rootScope.showOverlay('/components/scenarios/vitamin-k-foods/components/game-lose/game-lose.html', 'VitaminKLoseController', $scope.activeScenario, $scope.navigation);
		}
	}
});
