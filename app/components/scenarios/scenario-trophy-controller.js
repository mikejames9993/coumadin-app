'use strict';

angular.module('CoumadinApp').controller('ScenarioTrophyController', function($scope, data, navigation) {
	$scope.scenario = data;

	$scope.playAgain = function() {
		navigation.retry();
	};

	$scope.playMoreGames = function() {
		navigation.next();
	}
});
