'use strict';

angular.module('CoumadinApp').controller('VitaminKWinController', function($rootScope, $scope, data, navigation) {
	$scope.scenario = data;

	$scope.home = function() {
		$rootScope.goToLanding();
	};

	$scope.replay = function() {
		$rootScope.activeScenario = "vitamin-k-foods";
		navigation.retry();
	};
});
