'use strict';

angular.module('CoumadinHeroDataViewerApp').directive('gameTable', function() {
	return {
		scope: {
			gameName: '=name',
			gameData: '=games',
			// getLabels: '=labels',
			// csvData: '@csv'
		},
		templateUrl: 'components/data-viewer/game-table/game-table.html'
	};
});
