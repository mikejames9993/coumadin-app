'use strict';

angular.module('CoumadinApp').controller('FeedbackController', function($rootScope, $scope, _, data) {

	$scope.feedbackMessage = data.feedbackMessage;
	$scope.feedbackImage = data.feedbackImage;

	$scope.dismiss = function() {
		$rootScope.$broadcast('minigame:scenario:vitk:dismissfeedback');
	};
});
