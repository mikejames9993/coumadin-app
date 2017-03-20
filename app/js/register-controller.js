'use strict';

angular.module('CoumadinApp').controller('RegisterController', function($rootScope, $scope, $routeParams, $location) {
	console.log('Register controller loading');
	
	$scope.newUser = {
		firstName: "",
		lastName: "",
		email: "",
		age: null,
		sex: "",
		occupation: "",
		maritalStatus: "",
		password: ""
	};
	$scope.register = function(){
		console.log($scope.newUser);
		alert("Thank you for registering"+$scope.newUser)
		
		$location.path("/");
		
	};
	$rootScope.viewInfo = "All Fields are required";

});
