'use strict';

angular.module('CoumadinApp').controller('LandingController', function($rootScope, $scope, $routeParams, $location, Idle) {
	console.log('landing page controller loading');

	// $rootScope.viewInfo = "Select a mini game";
	$scope.minigame = function(game){
		console.log(game);
		$location.url(game);
		console.log('redirecting to ' + $location.url());
		Idle.watch(); //restart the timeout watch once navigation from the home screen occurs
		
	}

});