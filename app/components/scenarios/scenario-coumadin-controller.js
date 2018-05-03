'use strict';

angular.module('CoumadinApp').controller('ScenarioCoumadinController', function($rootScope, $scope, data, navigation) {
	$scope.scenario = data;

	$scope.skip = function() {
		navigation.start();
	};


	$scope.showRules = function() {
		if (data.config.id === 'pt-inr-monitoring') {
			var NoReasonSelected = Object.keys(data.custom.coumadinReasons).every(k => !data.custom.coumadinReasons[k]);
			if (NoReasonSelected) { //If no reason selected, show warning
				$rootScope.showMessage({
					type: 'warning',
					text: "Please Select a Reason Before Continuing."
				});
			} 
			else {
				navigation.showRules();
				$rootScope.hideMessage('warning');
			}
		} else {
			navigation.showRules();
		}
	};	

});
