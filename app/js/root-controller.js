'use strict';

angular.module('CoumadinApp').controller('RootController', function($rootScope, $scope, $location, screenSize) {
	console.log('root controller loading');

	$rootScope.viewInfo = "";
	$rootScope.alertMessage = null;

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

	$rootScope.showAlert = function(message) {
		console.log('showing alery');
		$rootScope.alertMessage = message;
	};

	$rootScope.hideAlert = function() {
		$rootScope.alertMessage = null;
	}

	$scope.$on('$routeChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 

		$rootScope.showUserLabel = $location.path() !== '/login'; 
		$rootScope.showBackBtn = $location.path() !== '/';
		$rootScope.showMenuBtn = $location.path() === '/';
		$rootScope.showInfoBtn = $location.path() !== '/';
	});

	// Using dynamic method `on`, which will set the variables initially and then update the variable on window resize
	$rootScope.desktop = screenSize.on('md, lg', function(match){
	    $rootScope.desktop = match;
	});
	$rootScope.mobile = screenSize.on('xs, sm', function(match){
	    $rootScope.mobile = match;
	});
	
});
