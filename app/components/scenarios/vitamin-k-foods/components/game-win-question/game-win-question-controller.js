'use strict';

angular.module('CoumadinApp').controller('VitaminKWinQuestionController', function($rootScope, $scope, data) {
	$scope.scenario = data;

	$scope.home = function() {
		$rootScope.goToLanding();
	};

	$scope.continue = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:dismissfeedback');
	};
});
