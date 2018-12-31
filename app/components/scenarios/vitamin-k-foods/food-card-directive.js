'use strict';

angular.module('CoumadinApp').directive('foodCard', function() {
	return {
		scope: {
			food: '=food',
			locationId: '@locationId'
		},
		templateUrl: 'components/scenarios/vitamin-k-foods/food-card.html'
	};
});