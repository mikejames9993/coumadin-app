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
            altName: 'Food Choices',
            motto: 'Eat Right, Eat Safely',
            icon: 'images/scenarios/diet.png',
            // instructions: 'Drag foods from the table down onto your plate to make your dinner plate. But make sure not to choose too much Vitamin K!',
            //instructions: "These food items contain varying amounts of Vitamin K. Make your dinner plate by dragging and dropping the food item on your plate. You can tap the food icon to display the name and for more information about the food.",
            coumadinInfo: [
                {
                    text: "Since you are on Coumadin, you should watch what you eat and drink since the diet can affect how Coumadin works in your body."
                }, {
                    text: "Vitamin K is essential to the clotting process in your body."
                }, {
                    text: "Some vegetables can contain high levels of Vitamin K."
                }, {
                    text: "You are advised to eat a normal, balanced diet."
                }
            ],
            rules: [{
                text: 'Ten pictures of high and low Vitamin K food items are shown. You will be asked to correctly place these items on a plate.'
            }, {
                text: 'You earn 100 points for each correct choice and lose 100 points for each wrong choice.'
            }, {
                text: 'Replay the game until all items are placed correctly.'
            }, {
                text: 'A proficiency badge will be awarded once all 10 foods are correctly placed.'
            }],
            trophyText: [{
                text: 'You\'ve earned enough points to earn a proficiency badge!'
            }, {
                text: 'You have earned your Proficiency Badge, which will display at the right corner of the Home screen the next time you play the game.'
            }, {
                text: 'Remember, you can still enjoy Vitamin K foods but not in excess!'
            }],
            trophyImage: 'images/badges/diet.png',
            foodItems: foodItems,
            footerResetText: 'Clear Plate'
        },
        drugs: {
            id: 'drug-interaction',
            name: 'Drug Interaction',
            altName: 'Drug Interactions',
            motto: 'Safely Medicate',
            icon: 'images/scenarios/drugs.png',
             coumadinInfo: [
                {
                    text: "Many drugs that reduce pain, decrease fever, or decrease swelling due to cuts or injuries can make you bleed."
                }, {
                    text: "Always check with your doctor or pharmacist before taking any medications you buy for yourself."
                }
            ],
            rules: [{
                text: "You will be given a medication cabinet filled with other medications available from the store. Follow the instructions and place these medications in the pill bottle."
                }, 
                {
                    text: "You earn 100 points for each correct choice and lose 100 points for each wrong choice."
                },
                {
                    text: "Redo the selection until all medications are placed correctly."
                },
                {
                    text: "You will earn a Porficiency Badge for being a hero caring for yourself."
            }],
            trophyText: [{
                text: 'You\'ve earned enough points to earn a proficiency badge!'
            }, {
                text: 'You have earned your Proficiency Badge, which will display at the right corner of the Home screen the next time you play the game.'
            }, {
                text: 'Remember, you must always check with your doctor or pharmacist before you take any new medications'
            }],
            trophyImage: 'images/badges/drug.png',
        },
        blood: {
            id: 'pt-inr-monitoring',
            name: 'Blood Clotting Testing',
            altName: 'PT/INR Monitoring',
            motto: 'Test and monitor your INR!',
            icon: 'images/scenarios/ptinr.png',
            coumadinInfo: [
                {
                    text: "Your INR number depends on your diagnosis."
                },{
                    text: "Select the reason why you are taking Coumadin (you can select more than one reason):"   
                },{
                    text: "Your doctor uses your blood clotting number to set your Coumadin dose."
                }                
            ],
            rules: [
                {
                    text: "The target INR number for your diagnosis will appear."
                }, 
                {
                    text: "Then do the blood test and explain what the INR number means to you."
                },
                {
                    text: "You earn 100 points for each correct explanation and lose 100 points for each wrong explanation."
                },
                {
                    text: "Redo the Testing until all values are explained correctly."
                },
                {
                    text: "You will earn a Porficiency Badge for being a hero caring for yourself."
            }],
            trophyText: [{
                text: "You selected the right responses about all your INR numbers"
            },{
                text: 'You\'ve earned enough points to earn a proficiency badge!'
            },{
                text: 'You have earned your Proficiency Badge, which will display at the right corner of the Home screen the next time you play the game.'
            }, {
                text: 'Remember, you must always check with your doctor or pharmacist when your INR numbers are too high or too low.'
            }],
            trophyImage: 'images/badges/pt-inr-monitoring.png',
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
        .when('/drug-interaction', {
        	controller: 'MinigameController',
            templateUrl: '/components/minigames/minigame.html',
            resolve: {
            	minigameConfig: function() {
            		return {
	            		name: 'Drug Interaction',
		            	scenarios: [
                            scenarios.drugs
                            ]
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
                        scenarios.blood
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
    };

    $rootScope.goToLanding = function() {
        $rootScope.hideMessage();
        $rootScope.hideOverlay();
        $location.url('/landing');
    };
});
