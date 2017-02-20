'use strict';

angular.module('CoumadinApp').controller('LoginController', function($scope, $routeParams, $location) {
	console.log('scenario controller loading');
	$scope.scenario = $routeParams.name;
	$scope.login = function(user){
		console.log(user);
		if (user.username === ""|| user.password === "") {
			alert('please fill in both username and password');
		} else {
			$location.path("/");
		}
	}

});

