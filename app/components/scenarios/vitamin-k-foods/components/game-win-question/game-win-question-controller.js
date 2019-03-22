'use strict';

angular.module('CoumadinApp').controller('VitaminKWinQuestionController', function($rootScope, $scope, data) {
	$scope.scenario = data;

	$scope.finish = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:usercontinuedecision', false);
	};

	$scope.continue = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:usercontinuedecision', true);
	};
});
