'use strict';

angular.module('CoumadinApp').controller('ScenarioOutroController', function($scope, data, navigation) {
	$scope.scenario = data;

	$scope.resume = function() {
		navigation.resume();
	};

	$scope.next = function() {
		navigation.next();
	}
});
