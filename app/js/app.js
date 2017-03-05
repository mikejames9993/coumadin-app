'use strict';

var app = angular.module('CoumadinApp', [
    'ngRoute',
    'permission',
    'permission.ng',
    'ui.bootstrap',
    'underscore'
]);

app.config(function($routeProvider) {

    var foodItems = [
    {
        name: 'asparagus',
        kAmount: '',
        src: "images/food-graphics/asparagus.png"
    },
    {
        name: 'broccoli',
        kAmount: '',
        src: "images/food-graphics/broccoli.png"
    },
    {
        name: 'brussel-sprouts',
        kAmount: '',
        src: "images/food-graphics/brussel-sprouts.png"
    },
    {
        name: 'cabbage',
        kAmount: '',
        src: "images/food-graphics/cabbage.png"
    },
    {
        name: 'carrots',
        kAmount: '',
        src: "images/food-graphics/carrots.png"
    },
    {
        name: 'celery',
        kAmount: '',
        src: "images/food-graphics/celery.png"
    },
    {
        name: 'chard',
        kAmount: '',
        src: "images/food-graphics/chard.png"
    },
    {
        name: 'collard-greens',
        kAmount: '',
        src: "images/food-graphics/collard-greens.png"
    },
    {
        name: 'corn',
        kAmount: '',
        src: "images/food-graphics/corn.png"
    },
    {
        name: 'grapes',
        kAmount: '',
        src: "images/food-graphics/grapes.png"
    },
    {
        name: 'green-onions',
        kAmount: '',
        src: "images/food-graphics/green-onions.png"
    },
    {
        name: 'kale',
        kAmount: '',
        src: "images/food-graphics/kale.png"
    },
    {
        name: 'liver',
        kAmount: '',
        src: "images/food-graphics/liver.png"
    },
    {
        name: 'mayo',
        kAmount: '',
        src: "images/food-graphics/mayo.png"
    },
    {
        name: 'parsley',
        kAmount: '',
        src: "images/food-graphics/parsley.png"
    },
    {
        name: 'peas',
        kAmount: '',
        src: "images/food-graphics/peas.png"
    },
    {
        name: 'potatos',
        kAmount: '',
        src: "images/food-graphics/potatos.png"
    },
    {
        name: 'radish',
        kAmount: '',
        src: "images/food-graphics/radish.png"
    },
    {
        name: 'tomatoes',
        kAmount: '',
        src: "images/food-graphics/tomatoes.png"
    }];

    var scenarios = {
        eating: {
            id: 'eating',
            name: 'Eating',
            instructions: 'Drag foods from the table down onto your plate to make your dinner plate. But make sure not to choose too much Vitamin K!',
            foodItems: foodItems
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
    };

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
                backdrop: false,
                // controllerAs: '$ctrl',
                size: 'fs',
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
