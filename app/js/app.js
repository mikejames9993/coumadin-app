'use strict';

var app = angular.module('CoumadinApp', [
    'ngRoute',
    'permission',
    'permission.ng',
    'ui.bootstrap',
    'underscore',
    'matchMedia',
    'ngSanitize'
]);

app.config(function($routeProvider) {

    var foodItems = [
    // {
    //     id: 'asparagus',
    //     name: 'Asparagus',
    //     kLevel: 2,
    //     src: "images/food-graphics/asparagus.png"
    // },
    {
        id: 'broccoli',
        name: 'Broccoli',
        kLevel: 1,
        src: "images/food-graphics/broccoli.png"
    },
    {
        id: 'brussels-sprouts',
        name: 'Brussels Sprouts',
        kLevel: 1,
        src: "images/food-graphics/brussels-sprouts.png"
    },
    // {
    //     id: 'cabbage',
    //     name: 'Cabbage',
    //     kLevel: 2,
    //     src: "images/food-graphics/cabbage.png"
    // },
    {
        id: 'carrots',
        name: 'Carrots',
        kLevel: 3,
        src: "images/food-graphics/carrots.png"
    },
    {
        id: 'celery',
        name: 'Celery',
        kLevel: 3,
        src: "images/food-graphics/celery.png"
    },
    {
        id: 'chard',
        name: 'Chard',
        kLevel: 1,
        src: "images/food-graphics/chard.png"
    },
    {
        id: 'collard-greens',
        name: 'Collard Greens',
        kLevel: 1,
        src: "images/food-graphics/collard-greens.png"
    },
    {
        id: 'corn',
        name: 'Corn',
        kLevel: 3,
        src: "images/food-graphics/corn.png"
    },
    {
        id: 'grapes',
        name: 'Grapes',
        kLevel: 3,
        src: "images/food-graphics/grapes.png"
    },
    {
        id: 'green-onions',
        name: 'Green Onions',
        kLevel: 1,
        src: "images/food-graphics/green-onions.png"
    },
    {
        id: 'kale',
        name: 'Kale',
        kLevel: 1,
        src: "images/food-graphics/kale.png"
    },
    {
        id: 'liver',
        name: 'Liver',
        kLevel: 3,
        src: "images/food-graphics/liver.png"
    },
    {
        id: 'mayo',
        name: 'Mayo',
        kLevel: 1,
        src: "images/food-graphics/mayo.png"
    },
    {
        id: 'parsley',
        name: 'Parsley',
        kLevel: 1,
        src: "images/food-graphics/parsley.png"
    },
    {
        id: 'peas',
        name: 'Peas',
        kLevel: 3,
        src: "images/food-graphics/peas.png"
    },
    {
        id: 'potatoes',
        name: 'Potatoes',
        kLevel: 3,
        src: "images/food-graphics/potatoes.png"
    },
    {
        id: 'radishes',
        name: 'Radishes',
        kLevel: 3,
        src: "images/food-graphics/radish.png"
    },
    {
        id: 'tomatoes',
        name: 'Tomatoes',
        kLevel: 3,
        src: "images/food-graphics/tomatoes.png"
    }];

    var scenarios = {
        diet: {
            id: 'diet',
            name: 'Diet',
            motto: 'Eat Right, Eat Safely',
            icon: 'images/scenarios/diet.png',
            // instructions: 'Drag foods from the table down onto your plate to make your dinner plate. But make sure not to choose too much Vitamin K!',
            //instructions: "These food items contain varying amounts of Vitamin K. Make your dinner plate by dragging and dropping the food item on your plate. You can tap the food icon to display the name and for more information about the food.",
            coumadinInfo: [
                {
                    title: "How does what I eat influence blood clotting?", 
                    text: "When you are on Coumadin, watch what you eat and drink since the diet can affect how Coumadin works in your body."
                }, {
                    text: "Remember that Vitamin K is essential to the clotting process in your body. But too much Vitamin K in your diet can lower the effect of Coumadin and make your blood thick."
                }, {
                    text: "Some foods grown on the ground, especially some vegetables, can contain high levels of Vitamin K."
                }, {
                    text: "You are advised to eat a normal, balanced diet. Try to eat the same amount of Vitamin K each week."
                }
            ],
            rules: [{
                text: 'Ten pictures of foods are shown. Some have high levels of Vitamin K and some have low levels of Vitamin K.'
            }, {
                text: 'You can earn 100 points for each item placed correctly the first time. You will lose 100 points for each wrong placement.'
            }, {
                text: 'Replay the game until all items are placed correctly.'
            }, {
                text: 'A proficiency badge will be awarded once all 10 foods are correctly placed.'
            }, {
                text: 'Click More Info on any screen to learn more about Coumadin.'
            }],
            trophyText: [{
                text: 'You made the right selection of all 10 low and high Vitamin K foods.'
            }, {
                text: 'You have earned a Proficiency Badge which will display at the right corner of the screen the next time you play the game.'
            }, {
                text: 'Remember, you can still enjoy Vitamin K food items but not in excess.'
            }],
            trophyImage: 'images/badges/diet.png',
            foodItems: foodItems,
            footerResetText: 'Clear Plate'
        },
        flossing: {
            id: 'flossing',
            name: 'Flossing',
            motto: '',
            icon: 'images/placeholder-example.gif',
            coumadinInfo: [],
            rules: [
                {
                    title: "Game Instructions", 
                    text: "Choose a type of floss to use. But be careful not to pick one that could cause bleeding!"
                }
            ],
            trophyText: [],
            trophyImage: ''
        },
        toothbrushing: {
            id: 'toothbrushing',
            name: 'Toothbushing',
            motto: '',
            icon: 'images/placeholder-example.gif',
            coumadinInfo: [],
            rules: [
                {
                    title: "Game Instructions", 
                    text: "Choose a type of toothbrush to use. But be careful not to pick one that could cause bleeding!"
                }
            ],
            trophyText: [],
            trophyImage: ''
        },
        bloodyStools: {
            id: 'bloody-stools',
            name: 'Bloody Stools',
            motto: '',
            icon: 'images/placeholder-example.gif',
            coumadinInfo: [],
            rules: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ],
            trophyText: [],
            trophyImage: ''
        },
        nodeBleeds: {
            id: 'node-bleeds',
            name: 'Nose Bleeds',
            motto: '',
            icon: 'images/placeholder-example.gif',
            coumadinInfo: [],
            rules: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ],
            trophyText: [],
            trophyImage: ''
        },
        cuts: {
            id: 'cuts',
            name: 'Cuts',
            motto: '',
            icon: 'images/placeholder-example.gif',
            coumadinInfo: [],
            rules: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ],
            trophyText: [],
            trophyImage: ''
        },
        falls: {
            id: 'falls',
            name: 'Falls',
            motto: '',
            icon: 'images/placeholder-example.gif',
            coumadinInfo: [],
            rules: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ],
            trophyText: [],
            trophyImage: ''
        },
        ptInrMonitoring: {
            id: 'pt-inr-monitoring',
            name: 'Blood Clotting Testing',
            motto: '',
            icon: 'images/scenarios/ptinr.png',
            coumadinInfo: [],
            rules: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ],
            trophyText: [],
            trophyImage: ''
        }
    };

    // Set up routing
    $routeProvider
        .when('/', {
            templateUrl: '/components/shared/landing.html',
            controller: 'LandingController',
            resolve: {
                configData: function(){
                    return {
                        helpText: 'Select an Item'
                    }
                }
            }
        })
        .when('/launch', {
            templateUrl: '/components/shared/landing.html',
            controller: 'LandingController'
        })
        .when('/login', {
            templateUrl: '/components/user/login.html',
            controller: 'LoginController',
            resolve: {
                configData: function(){
                    return {
                        helpText: 'Login to the app'
                    }
                }
            }
            // data: {
            //     permissions: {
            //         except: ['AUTHENTICATED'],
            //         redirectTo: '/'
            //     }
            // }
        })
        .when('/register', {
            templateUrl: '/components/user/register.html'
            // data: {
            //     permissions: {
            //         except: ['AUTHENTICATED'],
            //         redirectTo: '/'
            //     }
            // }
        })
        .when('/diet', {
        	controller: 'MinigameController',
            templateUrl: '/components/minigames/minigame.html',
            resolve: {
            	minigameConfig: function() {
            		return {
	            		name: 'Diet',
                        helpText: 'Drag food item to plate.',
		            	scenarios: [
                            scenarios.diet
                        ]
	            	}
	            }
            }
        })
        // .when('/oral-hygiene', {
        // 	controller: 'MinigameController',
        //     templateUrl: '/components/minigames/minigame.html',
        //     resolve: {
        //     	minigameConfig: function() {
        //     		return {
	       //      		name: 'Oral Hygiene',
		      //       	scenarios: [
        //                     scenarios.flossing,
        //                     scenarios.toothbrushing
        //                 ]
		      //       };
	       //      }
        //     }
        // })
        // .when('/safety', {
        // 	controller: 'MinigameController',
        //     templateUrl: '/components/minigames/minigame.html',
        //     resolve: {
        //     	minigameConfig: function() {
        //     		return {
	       //      		name: 'Safety',
		      //       	scenarios: [
        //                     scenarios.bloodyStools,
        //                     scenarios.nodeBleeds,
        //                     scenarios.cuts,
        //                     scenarios.falls,
        //                     scenarios.flossing,
        //                     scenarios.toothbrushing
        //                 ]
		      //       };
	       //      }
        //     }
        // })
        .when('/drug-interaction', {
        	controller: 'MinigameController',
            templateUrl: '/components/minigames/minigame.html',
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
            templateUrl: '/components/minigames/minigame.html',
            resolve: {
            	minigameConfig: function() {
            		return {
	            		name: 'Blood Clotting Testing',
		            	scenarios: [
                            scenarios.ptInrMonitoring
                        ]
		            };
	            }
            }
        })
        // .when('/info', {
        //     templateUrl: '/components/shared/coumadin-info.html',
        //     controller: 'CoumadinInfoController'
        // })
        .otherwise({ redirectTo: '/' });
});

app.run(function($rootScope, $location, $uibModal) {

    var standardModalInstance = null;
    var coumadinInfoModalInstance = null;

    $rootScope.userData = {
        name: 'Jimbo',
        score: 0
    };

    function doShowOverlay(templateUrl, controller, scopeData, navigation) {
        // $rootScope.overlay.template = template;
        // $rootScope.overlay.visible = true;
        var modalInstance = $uibModal.open({
            animation: false,
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
        return modalInstance;
    }

    $rootScope.showOverlay = function(templateUrl, controller, scopeData, navigation) {
        if (templateUrl) {
            standardModalInstance = doShowOverlay(templateUrl, controller, scopeData, navigation);
        }
    };

    $rootScope.showCoumadinInfoOverlay = function() {
        console.log('showing coumadin info overlay');
        coumadinInfoModalInstance = doShowOverlay('/components/shared/coumadin-info.html', 'CoumadinInfoController', {}, {});
    }

    $rootScope.hideOverlay = function() {
        if (standardModalInstance) {
            standardModalInstance.close();
            standardModalInstance = null;
        }
    };

    $rootScope.hideCoumadinInfoOverlay = function() {
        if (coumadinInfoModalInstance) {
            coumadinInfoModalInstance.close();
            coumadinInfoModalInstance = null;
        }
    }

    $rootScope.goToLanding = function() {
        $rootScope.hideOverlay();
        $location.url('/landing');
    };
});
