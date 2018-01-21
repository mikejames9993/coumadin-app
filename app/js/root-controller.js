'use strict';

angular.module('CoumadinApp').controller('RootController', function($rootScope, $scope, $location, screenSize, _) {
	console.log('root controller loading');

	$rootScope.viewInfo = "";
	$rootScope.bannerMessages = [];

	$rootScope.appName = "Coumadin Hero";
	$rootScope.user = {
		email: "",
		password: ""
	};

	$rootScope.logout = function(){
		$location.path("/login");
		$rootScope.user = {
			email: "",
			password: ""
		};
	};

	$rootScope.showInfo = function() {
		$rootScope.showOverlay('/components/shared/app-info.html', 'AppInfoController', $rootScope.information, null);
	};

	$rootScope.showMessage = function(message) {
		var index = _.findIndex($rootScope.bannerMessages, { type: message.type });
		if (index !== -1) {
			$rootScope.bannerMessages[index] = message;
		} else {
			$rootScope.bannerMessages.push(message);
		}
	};

	$rootScope.hideMessage = function(type) {
		if (type !== null && type !== undefined) {
			var index = _.findIndex($rootScope.bannerMessages, { type: type });
			if (index !== -1) {
				$rootScope.bannerMessages.splice(index, 1);
			}
		} else {
			$rootScope.bannerMessages = [];
		}
	};

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
