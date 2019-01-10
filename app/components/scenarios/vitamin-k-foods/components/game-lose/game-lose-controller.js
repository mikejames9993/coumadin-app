'use strict';

angular.module('CoumadinApp').controller('VitaminKLoseController', function($rootScope, $scope, data) {
	$scope.scenario = data;

	$scope.home = function() {
		$rootScope.goToLanding();
	};

	$scope.replay = function() {
		$rootScope.$broadcast('minigame:scenario:restart');
	};
});
