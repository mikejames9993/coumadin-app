'use strict';

angular.module('CoumadinApp').controller('ScenarioCoumadinController', function($rootScope, $scope, data, navigation) {
	$scope.scenario = data;
	console.log($scope.scenario.config.id);
	//console.log($scope.scenario.data.config.id);

	$scope.skip = function() {
		navigation.start();
	};


	$scope.showRules = function() {
		if (data.config.id === 'pt-inr-monitoring') {
			var numReasonsSelected = _.reduce(data.custom.coumadinReasons, function(memo, reason) {
				return memo + (reason === true ? 1 : 0);
			});
			// Object.keys(data.custom.coumadinReasons).every(k => !data.custom.coumadinReasons[k]);
			if (numReasonsSelected === 0) { //If no reason selected, show warning
				$rootScope.showMessage({
					type: 'warning',
					text: "Please Select a Reason Before Continuing."
				});
			} else if (numReasonsSelected > 1 && data.custom.coumadinReasons.other) {
				$rootScope.showMessage({
					type: 'warning',
					text: "You may not choose multiple reasons if one of them is that you have forgotten or don't know."
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
