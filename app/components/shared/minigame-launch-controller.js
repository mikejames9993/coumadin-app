'use strict';

angular.module('CoumadinApp').controller('MiniGameLaunchController', function($rootScope, $scope, $routeParams, $location) {
	console.log('landing page controller loading');

	$rootScope.viewInfo = "Select a mini game";
	$scope.minigame = function(game){
		console.log(game);
		$location.url(game);
		console.log('redirecting to ' + $location.url());
		
	}

});