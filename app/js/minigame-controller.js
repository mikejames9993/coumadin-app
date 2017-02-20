'use strict';

angular.module('CoumadinApp').controller('MinigameController', function($scope, $routeParams) {
	console.log('minigame controller loading');
	$scope.minigame = $routeParams.name;
});
