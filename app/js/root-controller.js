'use strict';

angular.module('CoumadinApp').controller('RootController', function($rootScope, $scope, $location) {
	console.log('root controller loading');
	$rootScope.user = {
		username: "",
		password: ""
	};
	$rootScope.logout = function(){
		$location.path("/login");
		$rootScope.user = {
			username: "",
			password: ""
		}
	}
});
