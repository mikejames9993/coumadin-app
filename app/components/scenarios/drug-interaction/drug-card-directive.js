'use strict';

angular.module('CoumadinApp').directive('drugCard', function() {
	return {
		scope: {
			drug: '=drug',
			locationId: '@locationId'
		},
		templateUrl: 'components/scenarios/drug-interaction/drug-card.html'
	};
});