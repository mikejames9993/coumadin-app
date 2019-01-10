'use strict';

angular.module('CoumadinApp').controller('ExcessiveSkipsController', function($rootScope, $scope, _) {
	console.log('time expired controller loading');

	$scope.quit = function() {
		$rootScope.goToLanding();
	};

	$scope.retry = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:retry');
	};

	$scope.continue = function() {
		// continue with skipping the selection
		$rootScope.$broadcast('minigame:scenario:vitk:finalskip');
	};
});
