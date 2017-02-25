'use strict';

var app = angular.module('CoumadinApp', [
    'ngRoute',
    'permission',
    'permission.ng',
    'ui.bootstrap'
]);

app.config(function($routeProvider) {

    var scenarios = {
        eating: {
            id: 'eating',
            name: 'Eating',
            instructions: 'Drag foods from the table down onto your plate to make your dinner plate. But make sure not to choose too much Vitamin K!'
        },
        flossing: {
            id: 'flossing',
            name: 'Flossing',
            instructions: 'Choose a type of floss to use. But be careful not to pick one that could cause bleeding!'
        },
        toothbrushing: {
            id: 'toothbrushing',
            name: 'Toothbushing',
            instructions: 'Choose a type of toothbrush to use. But be careful not to pick one that could cause bleeding!'
        },
        bloodyStools: {
            id: 'bloody-stools',
            name: 'Bloody Stools',
            instructions: 'N/A'
        },
        nodeBleeds: {
            id: 'node-bleeds',
            name: 'Nose Bleeds',
            instructions: 'N/A'
        },
        cuts: {
            id: 'cuts',
            name: 'Cuts',
            instructions: 'N/A'
        },
        falls: {
            id: 'falls',
            name: 'Falls',
            instructions: 'N/A'
        },
        ptInrMonitoring: {
            id: 'pt-inr-monitoring',
            name: 'PT/INR Monitoring',
            instructions: 'N/A'
        }
    }

    // Set up routing
    $routeProvider
        .when('/', {
            templateUrl: '/views/landing.html',
            // data: {
            //     permissions: {
            //         only: ['AUTHENTICATED'],
            //         redirectTo: '/login'
            //     }
            // }
        })
        .when('/login', {
            templateUrl: '/views/login.html',
            // data: {
            //     permissions: {
            //         except: ['AUTHENTICATED'],
            //         redirectTo: '/'
            //     }
            // }
        })
        .when('/diet', {
        	controller: 'MinigameController',
            templateUrl: '/views/minigames/minigame.html',
            resolve: {
            	minigameConfig: function() {
            		return {
	            		name: 'Diet',
		            	scenarios: [
                            scenarios.eating
                        ]
	            	}
	            }
            }
        })
        .when('/oral-hygiene', {
        	controller: 'MinigameController',
            templateUrl: '/views/minigames/minigame.html',
            resolve: {
            	minigameConfig: function() {
            		return {
	            		name: 'Oral Hygiene',
		            	scenarios: [
                            scenarios.flossing,
                            scenarios.toothbrushing
                        ]
		            };
	            }
            }
        })
        .when('/safety', {
        	controller: 'MinigameController',
            templateUrl: '/views/minigames/minigame.html',
            resolve: {
            	minigameConfig: function() {
            		return {
	            		name: 'Safety',
		            	scenarios: [
                            scenarios.bloodyStools,
                            scenarios.nodeBleeds,
                            scenarios.cuts,
                            scenarios.falls
                        ]
		            };
	            }
            }
        })
        .when('/drug-interaction', {
        	controller: 'MinigameController',
            templateUrl: '/views/minigames/minigame.html',
            resolve: {
            	minigameConfig: function() {
            		return {
	            		name: 'Drug Interaction',
		            	scenarios: []
		            };
	            }
            }
        })
        .when('/pt-inr-monitoring', {
        	controller: 'MinigameController',
            templateUrl: '/views/minigames/minigame.html',
            resolve: {
            	minigameConfig: function() {
            		return {
	            		name: 'PT/INR Monitoring',
		            	scenarios: [
                            scenarios.ptInrMonitoring
                        ]
		            };
	            }
            }
        })
        .otherwise({ redirectTo: '/' });
});

app.run(function($rootScope, $location, $uibModal) {

    var modalInstance = null;

    $rootScope.userData = {
        name: 'Jimbo',
        score: 1000
    };

    $rootScope.showOverlay = function(templateUrl, controller, scopeData, navigation) {
        if (templateUrl) {
            // $rootScope.overlay.template = template;
            // $rootScope.overlay.visible = true;
            modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: templateUrl,
                controller: controller,
                // controllerAs: '$ctrl',
                size: 'lg',
                // appendTo: parentElem,
                resolve: {
                    data: function () {
                        return scopeData;
                    },
                    navigation: function() {
                        return navigation;
                    }
                }
            });
        }
    };

    $rootScope.hideOverlay = function() {
        if (modalInstance) {
            modalInstance.close();
            modalInstance = null;
        }
    };

    $rootScope.goToLanding = function() {
        $location.url('/landing');
    };
});
