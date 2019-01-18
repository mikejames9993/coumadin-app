'use strict';

angular.module('CoumadinApp').controller('ExcessiveRetriesController', function($rootScope, $scope, _) {

	$scope.quit = function() {
		$rootScope.goToLanding();
	};

	$scope.skip = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:skip');
	};

	$scope.continue = function() {
		// continue with skipping the selection
		$rootScope.$broadcast('minigame:scenario:vitk:finalretry');
	};
});
