'use strict';

angular.module('CoumadinApp').controller('TimeExpiredController', function($rootScope, $scope, _) {
	console.log('time expired controller loading');

	$scope.retry = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:retry');
	};

	$scope.skip = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:skip');
	};
});
