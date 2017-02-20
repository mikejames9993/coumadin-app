'use strict';

angular.module('CoumadinApp').controller('RootController', function($rootScope, $scope) {
	console.log('root controller loading');
	$rootScope.user = {
		username: "",
		password: ""
	};
});
