'use strict';

angular.module('CoumadinApp').controller('LandingPageController', function($rootScope, $scope, $location, configData) {
	console.log('info controller loading');

	console.log(configData);

	$scope.playMiniGames = function() {
		$location.path("/launch");
	}

	$scope.showInfo = function(item) {
		$scope.selectedItem = item;
	}

	$scope.back = function() {
		$scope.selectedItem = null;
	}

	$rootScope.viewInfo = configData.helpText;

	$scope.foo = 'bar';
	$scope.helpText = configData.helpText;
	$scope.info = configData.info;
	$rootScope.viewInfo = "null";

});

