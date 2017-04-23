'use strict';

angular.module('CoumadinApp').controller('RootController', function($rootScope, $scope, $location, screenSize) {
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

	$rootScope.showInfo = function() {
		$rootScope.showOverlay('/components/shared/app-info.html', 'AppInfoController', $rootScope.information, null);
	};

	$scope.$on('$routeChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
		$rootScope.showUserLabel = $location.path() !== '/login'; 
		$rootScope.showBackBtn = $location.path() !== '/';
		$rootScope.showMenuBtn = $location.path() === '/';
	});

	// Using dynamic method `on`, which will set the variables initially and then update the variable on window resize
	$rootScope.desktop = screenSize.on('md, lg', function(match){
	    $rootScope.desktop = match;
	});
	$rootScope.mobile = screenSize.on('xs, sm', function(match){
	    $rootScope.mobile = match;
	});
	
});
