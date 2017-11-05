'use strict';

angular.module('CoumadinApp').controller('ScenarioCoumadinController', function($scope, data, navigation) {
	$scope.scenario = data;

	$scope.skip = function() {
		navigation.start();
	};

	$scope.showRules = function() {
		navigation.showRules();
	};
});
