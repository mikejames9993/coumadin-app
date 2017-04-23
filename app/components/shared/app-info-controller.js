'use strict';

angular.module('CoumadinApp').controller('AppInfoController', function($rootScope, $scope) {
	
	$scope.selectedItem = null;
	$scope.info = $rootScope.information;
	$scope.infoInOverlay = true;

	$scope.showInfo = function(item) {
		$scope.selectedItem = item;
	}

	$scope.back = function() {
		$scope.selectedItem = null;
	}

	$scope.close = function() {
		$rootScope.hideOverlay();
	}
	
});
