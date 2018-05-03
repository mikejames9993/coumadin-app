'use strict';

angular.module('CoumadinApp').controller('RootController', function($rootScope, $scope, $location, $timeout, screenSize, _, Idle, Keepalive) {
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

	$rootScope.counter = 60;
	$rootScope.stopped;

	$scope.startCountdown = function() {
	    $rootScope.stopped = $timeout(function() {
	       console.log($scope.counter);
	     $rootScope.counter--;   
	     $scope.startCountdown();   
	    }, 1000);
	};

    $scope.endTimeOut = function(){
    	$rootScope.hideMessage('warning');
        $rootScope.bannerMessages = [];
        $timeout.cancel($rootScope.stopped);
        $rootScope.counter = 60;
    }
	
	
	$rootScope.$on('IdleStart', function() {
        console.log('IdleStart');
		
		if ($location.path()!='/'){
			$scope.startCountdown();

        	$rootScope.showMessage({
				type: 'timeout',
			});
        }
      });

    $rootScope.$on('IdleEnd', function() {
      console.log('IdleEnd');
      $scope.endTimeOut();
    });


    $rootScope.$on('IdleTimeout', function() {
      console.log('IdleTimeout');
      $rootScope.goToLanding();
      $scope.endTimeOut();
    });




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
