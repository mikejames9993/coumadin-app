'use strict';

var NUM_GAME_FOODS = 17;//THATS HOW MANY FOODS WE HAVE
var POINTS_PER_RIGHT_CHOICE = 1;
var POINTS_PER_WRONG_CHOICE = 0;
var GOAL = 10;
var STANDARD_BG_IMAGE = "../../images/weird-guy/thinking-idea-guy.jpg";
var CORRECT_BG_IMAGE = "../../images/weird-guy/happy-guy.jpg";
var WRONG_BG_IMAGE = "../../images/weird-guy/bored-guy.jpg"
var CHAMPION_BG_IMAGE = "../../images/weird-guy/champion-guy.jpg";
var SECONDS_PER_GAME = 13; // 10 minutes

angular.module('CoumadinApp').controller('VitaminKController', function($rootScope, $scope, $timeout, $interval, $filter, _) {
	console.log('vitamin K controller loading');
	$scope.counter = 100; 
	$scope.buffetFoods = [];
	$scope.secondsRemaining = SECONDS_PER_GAME;

	$scope.startVitKCountdown = function() {
	    $scope.vitKCounter = $interval(function() {
	    	$scope.secondsRemaining--;
	    	if ($scope.secondsRemaining === 0) {
	    		$interval.cancel($scope.vitKCounter);
	    	}
	    }, 1000);
	};
    // $scope.endTimeOut = function(){
    //     $timeout.cancel($scope.vitKCounter);
    //     $scope.secondsRemaining = SECONDS_PER_GAME;
    // };
    $scope.startVitKCountdown();

    $scope.indexTracker = 0;
    $scope.leftPanelBGImage = STANDARD_BG_IMAGE;
    $scope.selectionMsg = "";
	$rootScope.userData.score = 0;
	//$scope.selectionBtnDisabled = true;



                    

	for (var i = 0; i < NUM_GAME_FOODS; i++) {
		$scope.buffetFoods.push(null);
	}



	$scope.selectionMade = function(selection){
		$scope.selectionBtnDisabled = true;

		console.log($scope.currentFoodItem);
		console.log(selection);

		if ($scope.currentFoodItem.kLevel === 1 && selection === 'high' || $scope.currentFoodItem.kLevel === 3 && selection === 'low') {
			correctSelectionMade();
		} else {
			inCorrectSelectionMade();
		}


		



		if ($scope.indexTracker === (NUM_GAME_FOODS - 1)){
			$scope.indexTracker = 0;
		} else {
			$scope.indexTracker++;
		}
		
		
	}

	var correctSelectionMade = function() {
		
		console.log('Correct');
		$rootScope.userData.score++;
		if ($rootScope.userData.score === 10) {
			console.log('YOU WIN');
			//$rootScope.userData.score = 0; - used if we wanna reset
			$rootScope.completeVitaminKGame();

		}

		//Could hide / show div's with success screen

		//show info modal with CORRECT bg image for 1.5 sec
    	$scope.leftPanelBGImage = CORRECT_BG_IMAGE;
    	$scope.selectionMsg = "Correct!";

		$timeout(resetForNextFood, 1000);
	};

	var inCorrectSelectionMade = function(){
		
		//show info modal with wrong bg image for 1.5 sec
        $scope.leftPanelBGImage = WRONG_BG_IMAGE;
        $scope.selectionMsg = "Wrong!";

        //Could hide / show div's with incorrect screen

        $timeout(resetForNextFood, 1000);
    	
	};

	function resetForNextFood() {
    	$scope.currentFoodItem = $scope.buffetFoods[$scope.indexTracker];
		$scope.leftPanelBGImage = STANDARD_BG_IMAGE;
    	$scope.selectionMsg = "";
    	$scope.selectionBtnDisabled = false;
	}



	initScenario();

	function initScenario() {
		


	
		// Select foods at random
		var gameFoods = _.first(_.shuffle($scope.activeScenario.config.foodItems), NUM_GAME_FOODS);
		for (var i = 0; i < gameFoods.length; i++) {
			$scope.buffetFoods[i] = _.extend({}, gameFoods[i], { expanded: false });
		}
		
		

		$scope.currentFoodItem = $scope.buffetFoods[$scope.indexTracker];
	}

	





		
	
});
