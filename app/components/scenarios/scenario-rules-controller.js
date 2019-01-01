'use strict';

angular.module('CoumadinApp').controller('ScenarioRulesController', function($rootScope, $scope, data, navigation) {
	$scope.scenario = data;

	$scope.back = function() {
		navigation.showCoumadinInfo();
	};

	$scope.start = function() {
		navigation.start();
	};
	
});
