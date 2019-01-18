'use strict';

angular.module('CoumadinApp').controller('TimeExpiredController', function($rootScope, $scope, data, _) {
	console.log('time expired controller loading');

	$scope.enableSkip = data.enableSkip;
	$scope.enableRetry = data.enableRetry;

	$scope.retry = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:retry');
	};

	$scope.skip = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:skip');
	};
});
