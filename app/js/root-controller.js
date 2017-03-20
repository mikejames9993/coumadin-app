'use strict';

angular.module('CoumadinApp').controller('RootController', function($rootScope, $scope, $location) {
	console.log('root controller loading');

	$rootScope.viewInfo = "";

	$rootScope.appName = "Warfarin Hero";
	$rootScope.user = {
		email: "",
		password: ""
	};

	$rootScope.logout = function(){
		$location.path("/login");
		$rootScope.user = {
			email: "",
			password: ""
		}
	};

	// $rootScope.register = function(){
	// 	$location.path("/register");
	// }

	$scope.$on('$routeChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
		$rootScope.showUserLabel = $location.path() !== '/login'; 
		$rootScope.showBackBtn = $location.path() !== '/';
		$rootScope.showMenuBtn = $location.path() === '/';
	});
	
});
