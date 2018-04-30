'use strict';

angular.module('CoumadinApp').controller('CoumadinInfoOverrideController', function($rootScope, $scope, $location, data, navigation) {
	console.log('info override controller loading');

    $scope.infos = data.infos;

    $scope.close = function() {
    	$rootScope.hideCoumadinInfoOverlay();
    };
});
