'use strict';

angular.module('CoumadinApp').controller('ScenarioOutroController', function($scope, data, navigation) {
	$scope.scenario = data;

	$scope.retry = function() {
		navigation.resume();
	};

	$scope.next = function() {
		navigation.next();
	}
});
