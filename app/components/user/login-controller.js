'use strict';

angular.module('CoumadinApp').controller('LoginController', function($rootScope, $scope, $routeParams, $location, configData) {
	console.log('Login controller loading');

	$rootScope.viewInfo = configData.helpText;
	
	$scope.scenario = $routeParams.name;
	$scope.login = function(user){
		console.log(user);
		$location.path("/");
	
	};

	$scope.register = function(){
		$location.path("/register");
	};

});

