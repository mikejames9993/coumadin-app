'use strict';

angular.module('CoumadinApp').controller('VitaminKWinController', function($rootScope, $scope, data, navigation) {
	$scope.scenario = data;

	$scope.home = function() {
		$rootScope.goToLanding('gohome');//$rootScope.$broadcast('end-vit-k-with-more-than-10');//$rootScope.goToLanding();
	};

	$scope.replay = function() {
		$rootScope.activeScenario = "vitamin-k-foods";
		// $rootScope.$broadcast('minigame:scenario:restart');
		navigation.retry();
	};
});
