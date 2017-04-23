'use strict';

angular.module('CoumadinApp').controller('ScenarioIntroController', function($scope, data, navigation) {
	$scope.scenario = data;

	$scope.start = function() {
		navigation.start();
	}
});
