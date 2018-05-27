'use strict';

var NUM_GAME_DRUGS = 12;
var NUM_SELECTED_DRUGS = 2;
var POINTS_PER_RIGHT_CHOICE = 100;
var POINTS_PER_WRONG_CHOICE = -100;

var ALL_DRUGS = [{
	id: 'motrin',
	name: 'Motrin',
	riskLevel: 1  // 1=high, 2=low
}, {
	id: 'advil',
	name: 'Advil',
	riskLevel: 1
}, {
	id: 'aspirin',
	name: 'Aspirin',
	riskLevel: 1
}, {
	id: 'plavix',
	name: 'Plavix',
	riskLevel: 1
}, {
	id: 'tylenol',
	name: 'Tylenol',
	riskLevel: 1
}, {
	id: 'ibuprofen',
	name: 'Ibuprofen',
	riskLevel: 1
}, {
	id: 'fish',
	name: 'Fish Oil',
	riskLevel: 1
}, {
	id: 'ginseng',
	name: 'Ginseng',
	riskLevel: 1
}, {
	id: 'flonase',
	name: 'Flonase',
	riskLevel: 2
}, {
	id: 'claritin',
	name: 'Claritin',
	riskLevel: 2
}, {
	id: 'pepto',
	name: 'Pepto-Bismol',
	riskLevel: 2
}, {
	id: 'aleve',
	name: 'Aleve Naproxen',
	riskLevel: 2
}, {
	id: 'imodium',
	name: 'Imodium',
	riskLevel: 2
}];

angular.module('CoumadinApp').controller('DrugInteractionController', function($rootScope, $scope, $timeout, _) {
	console.log('drug interaction controller loading');

	$scope.cabinetDrugs = [];
	$scope.selectedDrugs = [];
	$scope.activeChallenge = null;
	$scope.instructions = '';

	for (var i = 0; i < NUM_GAME_DRUGS; i++) {
		$scope.cabinetDrugs.push(null);
	}
	for (var i = 0; i < NUM_SELECTED_DRUGS; i++) {
		$scope.selectedDrugs.push(null);
	}

	var challenges = [{
		highRisk: 1,
		lowRisk: 1
	}, {
		highRisk: 2,
		lowRisk: 0
	}, {
		highRisk: 0,
		lowRisk: 2
	}];
	var singleItemChallenges = [{
		highRisk: 1,
		lowRisk: 0
	}, {
		highRisk: 0,
		lowRisk: 1
	}];

	var singleItemRules = false;

	var restartEventHandle = $rootScope.$on('minigame:scenario:restart', initScenario);
	var resumeEventHandle = $rootScope.$on('minigame:scenario:resume', function(event, priorStatus) {
		resumeScenario(priorStatus);
	});

	// deregister event listeners when this controller is destroyed
	$scope.$on("$destroy", function() {
        restartEventHandle();
        resumeEventHandle();
    });

	initScenario();

	function initScenario() {
		// override testSubmit with a custom condition check
		$scope.activeScenario.testSubmit = function() {
			var numSelectedDrugs = countSelectedDrugs();
			var targetSelectedDrugs = singleItemRules ? 1 : NUM_SELECTED_DRUGS;
			if (numSelectedDrugs < targetSelectedDrugs) {
				if (numSelectedDrugs === 0) {
					return 'Please place ' + targetSelectedDrugs + ' drugs on the tray before you can submit.';
				} else {
					return 'Please add 1 more drug to the tray before you can submit.';
				}
			}
			return null;
		};
		// override footerReset to perform custom reset when footer reset button is clicked
		$scope.activeScenario.footerReset = function() {
			for (var i = 0; i < $scope.selectedDrugs.length; i++) {
				var selectedDrug = $scope.selectedDrugs[i];
				if (selectedDrug) {
					for (var k = 0; k < $scope.cabinetDrugs.length; k++) {
						var cabinetDrug = $scope.cabinetDrugs[k];
						if (!cabinetDrug) {
							$scope.cabinetDrugs[k] = selectedDrug;
							$scope.selectedDrugs[i] = null;
							break;
						}
					}
				}
			}
			$rootScope.hideMessage('warning');
		};
	
		// Select drugs at random
		var gameDrugs = _.first(_.shuffle(ALL_DRUGS), NUM_GAME_DRUGS);
		for (var i = 0; i < gameDrugs.length; i++) {
			$scope.cabinetDrugs[i] = gameDrugs[i];
		}

		// Select a random challenge scenario
		singleItemRules = false;
		clearSelectedDrugs();
		selectChallenge();
		displayInstructions();
		customizeScenarioStatus();
	}

	function resumeScenario(priorStatus) {
		console.log('resuming after ' + priorStatus.outcome + ' outcome');
		// If player was successful, pick a new challenge and remove prior selected items from play
		if (priorStatus.outcome === 'good') {
			_.each($scope.selectedDrugs, function(selectedDrug) {
				if (selectedDrug) {
					var index = _.findIndex($scope.cabinetDrugs, { id: selectedDrug.id });
					$scope.cabinetDrugs[index] = null;
				}
			});
			var remainingDrugs = getRemainingDrugs();
			if (remainingDrugs.length <= NUM_SELECTED_DRUGS) {
				console.log('entering SINGLE ITEM RULES mode');
				singleItemRules = true;
			}
			clearSelectedDrugs();
			selectChallenge();
			customizeScenarioStatus(0, 0);
		}
		displayInstructions();
	}

	function selectChallenge() {
		var remainingHighRiskDrugs = _.where($scope.cabinetDrugs, { riskLevel: 1 });
		var remainingLowRiskDrugs = _.where($scope.cabinetDrugs, { riskLevel: 2 });

		var challengeSet = challenges;
		if (singleItemRules) {
			challengeSet = singleItemChallenges;
		}

		var availableChallenges = _.filter(challengeSet, function(challenge) {
			return challenge.highRisk <= remainingHighRiskDrugs.length && challenge.lowRisk <= remainingLowRiskDrugs.length;
		});
		
		$scope.activeChallenge = _.shuffle(availableChallenges)[0];
	}

	function displayInstructions() {
		var challengeInstructions = '';
		if ($scope.activeChallenge.highRisk > 0 && $scope.activeChallenge.lowRisk > 0) {
			challengeInstructions = 'Place ' + $scope.activeChallenge.highRisk + ' high and ' + $scope.activeChallenge.lowRisk + ' low risk drugs on the tay';
		} else if ($scope.activeChallenge.highRisk === 0 && $scope.activeChallenge.lowRisk > 0) {
			challengeInstructions = 'Place ' + $scope.activeChallenge.lowRisk + ' low risk drug(s) on the tray';
		} else {
			challengeInstructions = 'Place ' + $scope.activeChallenge.highRisk + ' high risk drug(s) on the tray';
		}
		console.log('instructions: ' + challengeInstructions);

		// Display instructions
		$scope.instructions = challengeInstructions;
	}

	function clearSelectedDrugs() {
		for (var i = 0; i < $scope.selectedDrugs.length; i++) {
			$scope.selectedDrugs[i] = null;
		}
	}

	function customizeScenarioStatus(numRightChoices, numWrongChoices) {
		numRightChoices = numRightChoices || 0;
		numWrongChoices = numWrongChoices || 0;
		$scope.activeScenario.status.custom = {
			selectedDrugs: $scope.selectedDrugs,
			numRightChoices: numRightChoices,
			numWrongChoices: numWrongChoices,
			pointsPerRightChoice: POINTS_PER_RIGHT_CHOICE,
			pointsPerWrongChoice: POINTS_PER_WRONG_CHOICE
		};
	}

	function calculateScore() {
		var highRiskSelections = [];
		var lowRiskSelections = [];
		for (var i = 0; i < $scope.selectedDrugs.length; i++) {
			var drug = $scope.selectedDrugs[i];
			if (drug) {
				switch (drug.riskLevel) {
					case 1:
						highRiskSelections.push(drug);
						break;
					case 2:
						lowRiskSelections.push(drug);
						break;
				}
			}
		}

		var numWrongChoices = Math.abs($scope.activeChallenge.highRisk - highRiskSelections.length);
		var numRightChoices = (highRiskSelections.length + lowRiskSelections.length) - numWrongChoices;

		var scoreChange = (numWrongChoices * POINTS_PER_WRONG_CHOICE) + (numRightChoices * POINTS_PER_RIGHT_CHOICE);
		var outcome = 'good';
		if (numWrongChoices > 0) {
			outcome = 'bad';
		}

		console.log('high risk choices: ' + highRiskSelections.length + '/' + $scope.activeChallenge.highRisk + ', low risk choices: ' + lowRiskSelections.length + '/' + $scope.activeChallenge.lowRisk);
		console.log('num wrong choices: ' + numWrongChoices + ', num right choices: ' + numRightChoices);
		console.log('outcome: ' + outcome);
		$scope.activeScenario.status.scoreChange = scoreChange;
		$scope.activeScenario.status.outcome = outcome;
		$scope.activeScenario.status.custom = {
			selectedDrugs: $scope.selectedDrugs,
			numWrongChoices: numWrongChoices,
			numRightChoices: numRightChoices,
			pointsPerRightChoice: POINTS_PER_RIGHT_CHOICE,
			pointsPerWrongChoice: POINTS_PER_WRONG_CHOICE
		};

		var remainingDrugs = getRemainingDrugs();
		var numRemainingDrugs = remainingDrugs.length;

		var firstRiskLevel = null;
		var multipleRiskLevels = false;
		if ($scope.activeScenario.status.outcome === 'good' && numRemainingDrugs <= NUM_SELECTED_DRUGS) {
			// Special rules for when there are only 1 or 2 drugs left
			_.each(remainingDrugs, function(remainingDrug) {
				if (firstRiskLevel === null) {
					firstRiskLevel = remainingDrug.riskLevel;
				}
				if (remainingDrug.riskLevel !== firstRiskLevel) {
					multipleRiskLevels = true;
				}
			});
			// If both remaining drugs are the same risk level, we're done
			if (!multipleRiskLevels) {
				$scope.activeScenario.status.scoreChange += (numRemainingDrugs * POINTS_PER_RIGHT_CHOICE);
				$scope.activeScenario.status.complete = true;
			} else {
				$scope.activeScenario.status.complete = false;
			}
		} else {
			$scope.activeScenario.status.complete = ($scope.activeScenario.status.outcome === 'good' && numRemainingDrugs === 0);
		}
	}

	$scope.selectCabinetDrug = function(drug) {
		if (!canSelectMoreDrugs()) {
			$rootScope.showMessage({
				type: 'warning',
				text: 'You cannot put more than ' + (singleItemRules ? 1 : NUM_SELECTED_DRUGS) + ' items on the tray.'
			});
		} else {
			$rootScope.hideMessage('warning');

			// Remove drug from cabinet
			var cabinetIndex = _.findIndex($scope.cabinetDrugs, { id: drug.id });
			$scope.cabinetDrugs[cabinetIndex] = null;

			// Add drug to tray
			for (var i = 0; i < $scope.selectedDrugs.length; i++) {
				if ($scope.selectedDrugs[i] === null) {
					$scope.selectedDrugs[i] = drug;
					break;
				}
			}
			
			// Recalculate score
			calculateScore();
		}
	};

	$scope.selectTrayDrug = function(drug) {
		// Remove drug from tray
		var trayIndex = _.findIndex($scope.selectedDrugs, { id: drug.id });
		$scope.selectedDrugs[trayIndex] = null;

		// Add drug back to first empty slot in cabinet
		for (var i = 0; i < $scope.cabinetDrugs.length; i++) {
			if ($scope.cabinetDrugs[i] === null) {
				$scope.cabinetDrugs[i] = drug;
				break;
			}
		}

		// Recalculate score
		calculateScore();
	};

	function canSelectMoreDrugs() {
		var numSelectedDrugs = countSelectedDrugs();
		var maxSelectedDrugs = singleItemRules ? 1 : NUM_SELECTED_DRUGS;
		return numSelectedDrugs < maxSelectedDrugs;
	}

	function countSelectedDrugs() {
		var numSelectedDrugs = 0;
		_.each($scope.selectedDrugs, function(selectedDrug) {
			if (selectedDrug) {
				numSelectedDrugs++;
			}
		});
		return numSelectedDrugs;
	}

	function getRemainingDrugs() {
		return _.filter($scope.cabinetDrugs, function(drug) {
			return drug !== null && drug !== undefined;
		}) || [];
	}
});
