'use strict';

angular.module('CoumadinApp').controller('NameEntryController', function($rootScope, $scope, $timeout) {
	
	$scope.username = '';
	$scope.error = null;

	// $timeout(function() {
	// 	var nameInput = document.getElementById("#name-input");
	// 	if (nameInput) {
	// 		nameInput.focus();
	// 	}
	// }, 100);

	$scope.enter = function() {
		$scope.error = null;
		if ($scope.username && $scope.username.length > 0) {
			var sanitizedName = $scope.username.replace(/[^a-zA-Z0-9\'\- ]/g, '');
			if (sanitizedName.length === 0) {
				$scope.error = 'Please enter a name with no special characters';
			} else {
				$rootScope.username = sanitizedName;
				$rootScope.$broadcast('app:username', sanitizedName);
			}
		} else {
			$scope.error = 'Please enter your name';
		}
		$rootScope.hideOverlay();
	};
});
