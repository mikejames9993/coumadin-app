'use strict';

angular.module('CoumadinApp').controller('LandingPageController', function($scope, $routeParams, $location) {
	console.log('landing page controller loading');
	$scope.minigame = function(game){
		console.log(game);
		$location.path("#/minigame?name="+game);
		
	}

});

