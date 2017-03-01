'use strict';

angular.module('CoumadinApp').controller('RootController', function($rootScope, $scope, $location) {
	console.log('root controller loading');
	$rootScope.user = {
		username: "",
		password: ""
	};
	$rootScope.logout = function(){
		$location.path("/login");
		$rootScope.user = {
			username: "",
			password: ""
		}
	};

	$scope.$on('$routeChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
		$rootScope.showUserLabel = $location.path() !== '/login'; 
		$rootScope.showBackBtn = $location.path() !== '/';
		$rootScope.showMenuBtn = $location.path() === '/';
	});
	
});
