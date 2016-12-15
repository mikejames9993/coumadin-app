'use strict';

angular.module('CoumadinApp').controller('ScenarioController', function($scope, $routeParams) {
	console.log('scenario controller loading');
	$scope.scenario = $routeParams.name;
});
