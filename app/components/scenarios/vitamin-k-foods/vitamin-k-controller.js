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

angular.module('CoumadinApp').controller('VitaminKController', function($rootScope, $scope, $timeout, $interval, $filter, $uibModal, _) {
	console.log('vitamin K controller loading');
	$scope.counter = 100; 
	$scope.buffetFoods = [];
	$scope.gameSecondsRemaining = SECONDS_PER_GAME;
	$scope.selectionSecondsRemaining = SECONDS_PER_SELECTION;
	$scope.consecutiveSkips = 0;

	var startEventHandle = $rootScope.$on('minigame:scenario:start', initScenario);
	var restartEventHandle = $rootScope.$on('minigame:scenario:restart', initScenario);
	var retryEventHandle = $rootScope.$on('minigame:scenario:vitk:retry', retrySelection);
	var evalSkipEventHandle = $rootScope.$on('minigame:scenario:vitk:skip', evalSkipSelection);
	var skipEventHandle = $rootScope.$on('minigame:scenario:vitk:finalskip', skipSelection);
	var dismissFeedbackHandle = $rootScope.$on('minigame:scenario:vitk:dismissfeedback', resetForNextFood);
	$scope.$on("$destroy", function() {
		hideModal();
		stopTicker();
		startEventHandle();
		restartEventHandle();
		retryEventHandle();
		evalSkipEventHandle();
		skipEventHandle();
		dismissFeedbackHandle();
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
                    	enableSkip: $scope.consecutiveSkips < 3
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

    function retrySelection() {
    	hideModal();
    	resetForCurrentFood();
    	startGameCountdown();
    }

    function evalSkipSelection() {
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
    	hideModal();
    	resetForNextFood();
    	startGameCountdown();
    }
	
	$scope.selectionMade = function(selection) {
		stopSelectionCountdown();
		$scope.selectionBtnDisabled = true;
		$scope.consecutiveSkips = 0;

		console.log($scope.currentFoodItem);
		console.log(selection);

		if ($scope.currentFoodItem.kLevel === 1 && selection === 'high' || $scope.currentFoodItem.kLevel === 3 && selection === 'low') {
			correctSelectionMade();
		} else {
			incorrectSelectionMade();
		}
	}

	var correctSelectionMade = function() {
		
		console.log('Correct');
		$rootScope.userData.score++;
		$scope.activeScenario.scoreChange++;

		// $scope.leftPanelBGImage = CORRECT_BG_IMAGE;
    	// $scope.selectionMsg = FEEDBACK_MESSAGE_RIGHT;

		if ($scope.activeScenario.scoreChange === 10) {
			console.log('YOU WIN');
			endGame();
			//$rootScope.userData.score = 0; - used if we wanna reset
		} else {
			// $timeout(resetForNextFood, FEEDBACK_DISPLAY_INTERVAL_SECONDS * 1000);
			showFeedbackModal(FEEDBACK_MESSAGE_RIGHT, CORRECT_BG_IMAGE);
		}
		//Could hide / show div's with success screen

		//show info modal with CORRECT bg image for 1.5 sec
	};

	var incorrectSelectionMade = function(){
		
		// //show info modal with wrong bg image for 1.5 sec
        // $scope.leftPanelBGImage = WRONG_BG_IMAGE;
        // $scope.selectionMsg = FEEDBACK_MESSAGE_WRONG;

        //Could hide / show div's with incorrect screen

        // $timeout(resetForNextFood, FEEDBACK_DISPLAY_INTERVAL_SECONDS * 1000);
        showFeedbackModal(FEEDBACK_MESSAGE_WRONG, WRONG_BG_IMAGE);
	};

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
		$rootScope.hideOverlay();
		$scope.activeScenario.scoreChange = 0;
		$scope.gameSecondsRemaining = SECONDS_PER_GAME;
		$scope.selectionSecondsRemaining = SECONDS_PER_SELECTION;
    	$scope.selectionBtnDisabled = false;

		// Select foods at random
		$scope.consecutiveSkips = 0;
		var gameFoods = _.first(_.shuffle($scope.activeScenario.config.foodItems), NUM_GAME_FOODS);
		for (var i = 0; i < gameFoods.length; i++) {
			$scope.buffetFoods[i] = _.extend({}, gameFoods[i], { expanded: false });
		}
		$scope.currentFoodItem = $scope.buffetFoods[$scope.indexTracker];
		startTicker();
		startGameCountdown();
    	startSelectionCountdown();
	}

	function endGame() {
		hideModal();
		$rootScope.hideOverlay();
		if ($scope.activeScenario.scoreChange >= 10) {
			// $scope.activeScenario.status.outcome = 'good';
			if ($scope.gameSecondsRemaining > 0) {
				// still some time left - let the user decide if they want to keep playing
				$rootScope.showOverlay('/components/scenarios/vitamin-k-foods/components/game-win-question/game-win-question.html', 'VitaminKWinQuestionController', $scope.activeScenario, null);
			} else {
				// time is up - show the trophy screen
				$rootScope.showOverlay('/components/scenarios/vitamin-k-foods/components/game-win/game-win.html', 'VitaminKWinController', $scope.activeScenario, null);
			}
		} else {
			// $scope.activeScenario.status.outcome = 'bad';
			$rootScope.showOverlay('/components/scenarios/vitamin-k-foods/components/game-lose/game-lose.html', 'VitaminKLoseController', $scope.activeScenario, null);
		}
	}
});
