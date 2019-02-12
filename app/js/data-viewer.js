'use strict'

var app = angular.module('CoumadinHeroDataViewerApp', [
    'ui.bootstrap',
    'underscore'
]);

app.config(function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
});

var STANDARD_COLUMN_LABELS = ['Game ID', 'User Name', 'Start Time', 'End Time', 'Elapsed Time (s)', 'Outcome'];
var DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss';

app.run(function($rootScope, $timeout, _) {
	$rootScope.gamesByType = null;
	$rootScope.foundData = false;

	var db = firebase.database();
	db.ref('/test/games').orderByChild('timeStarted').once('value').then(function(snapshot) {
		var games = snapshot.val();
		console.log(JSON.stringify(games, null, 2));
		// $rootScope.$broadcast('dataviewer:data', games);
		$timeout(function() {
			initGameData(games);
		}, 0);
	});

	function initGameData(games) {
		$rootScope.gamesByType = _.groupBy(games, 'gameName');
		_.each($rootScope.gamesByType, function(games, gameName) {
			$rootScope.foundData = true;
			$rootScope.gamesByType[gameName] = {
				labels: getLabels(games),
				csvData: generateCsv(games),
				fileName: gameName.replace(/\s+/g, '') + '-data.csv',
				games: games
			};
		});
	}

	function generateCsv(games) {
		console.log('generatecsv');
		var labels = getLabels(games);
		var headerRow = [];
		Array.prototype.push.apply(headerRow, STANDARD_COLUMN_LABELS);
		Array.prototype.push.apply(headerRow, labels);
		var csvRows = [headerRow.join(',')];
		_.each(games, function(game) {
			var cells = [
				game.gameId,
				game.username,
				moment(game.timeStarted).format(DATE_FORMAT),
				moment(game.timeFinished).format(DATE_FORMAT),
				game.elapsedTimeSeconds,
				game.outcome
			];
			_.each(game.customFields, function(customField) {
				cells.push(customField.value);
			});
			csvRows.push(cells.join(','));
		});
		return encodeURIComponent(csvRows.join('\n'));
	}

	function getLabels(games) {
		console.log('getlabels');
		var labels = [];
		if (games.length > 0) {
			var sampleGame = _.last(games);
			_.each(sampleGame.customFields, function(customField) {
				labels.push(customField.label);
			});
		}
		return labels;
	}
});
