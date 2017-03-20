'use strict';

angular.module('CoumadinApp').controller('LoginController', function($rootScope, $scope, $routeParams, $location) {
	console.log('scenario controller loading');

	$rootScope.viewInfo = "";
	
	$scope.scenario = $routeParams.name;
	$scope.login = function(user){
		console.log(user);
		$location.path("/");
	
	};

	$scope.register = function(){
		$location.path("/register");
	};

});

