'use strict';

var app = angular.module('CoumadinApp', [
    'ngRoute',
    'permission',
    'permission.ng',
    'ui.bootstrap',
    'underscore',
    'matchMedia',
    'ngSanitize',
    'ngIdle',
    'timer'
]);
// config(['KeepaliveProvider', 'IdleProvider', function(
// app.config(function($routeProvider) {
app.config(function($routeProvider, KeepaliveProvider, IdleProvider) {


    IdleProvider.idle(840); //14 minutes before the 1 minute warning
    IdleProvider.timeout(60); //warning will show for 1 minute before returning user to home screen
    //1 - high
    //3 - low

    var foodItems = [
    {
        id: 'asparagus',
        name: 'Asparagus',
        kLevel: 1,
        src: "images/food-graphics/asparagus.png"
    },
    {
        id: 'boiled-egg',
        name: 'Boiled Egg',
        kLevel: 3,
        src: "images/food-graphics/boiled-egg.png"
    },
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
        id: 'cucumber',
        name: 'Cucumber',
        kLevel: 3,
        src: "images/food-graphics/cucumber.png"
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
        id: 'milk',
        name: 'Milk',
        kLevel: 3,
        src: "images/food-graphics/milk.png"
    },
    {
        id: 'mayo',
        name: 'Mayo',
        kLevel: 1,
        src: "images/food-graphics/mayo.png"
    },
    {
        id: 'mushroom',
        name: 'Mushroom',
        kLevel: 3,
        src: "images/food-graphics/mushroom.png"
    },
    {
        id: 'orange',
        name: 'Orange',
        kLevel: 3,
        src: "images/food-graphics/orange.png"
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
        id: 'peanuts',
        name: 'Peanuts',
        kLevel: 3,
        src: "images/food-graphics/peanuts.png"
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
        /*diet: {
            id: 'diet',
            name: 'Diet',
            altName: 'Food Choices',
            motto: 'Eat Right, Eat Safely',
            icon: 'images/scenarios/diet.png',
            // instructions: 'Drag foods from the table down onto your plate to make your dinner plate. But make sure not to choose too much Vitamin K!',
            //instructions: "These food items contain varying amounts of Vitamin K. Make your dinner plate by dragging and dropping the food item on your plate. You can tap the food icon to display the name and for more information about the food.",
            coumadinInfoSource: 'config',
            coumadinInfo: [
                {
                    text: "Since you are on Coumadin, you should watch what you eat and drink since the diet can affect how Coumadin works in your body."
                }, {
                    text: "Vitamin K is essential to the clotting process in your body."
                }, {
                    text: "Some food items can contain high levels of Vitamin K."
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
            footerResetText: 'Clear Plate',
            overrideMoreInfo: false
        },
        */
        vitaminkfood: {
            id: 'vitamin-k-foods',
            name: 'Vitamin K Foods',
            altName: 'Vitamin K Foods',
            motto: '',
            icon: 'images/scenarios/diet.png',
            coumadinInfoSource: 'config',
            coumadinInfo: [{
                text: "The focus of this app is to teach you about diet and Coumadin"
            }, {
                text: "You are on Coumadin to treat or prevent blood clots"
            }, {
                text: "Vitamin K alters your clotting"
            }, {
                text: "Foods can affect vitamin K levels in your body"
            }, {
                text: "It is vital to understand what foods to avoid"
            }, {
                text: "You can read more about foods and Coumadin by tapping on the 'More Info' button"
            }
            ],
            rulesSource: 'config',
            rules: [{
                text: "You will select the level of Vitamin K for each food shown"
            }, {
                text: "Tap the HIGH or LOW to indicate the level of Vitamin K"
            }, {
                text: "You earn one (1) point per correct answer"
            }, {
                text: "You have 10 minutes to earn 10 points. The game session ends after 10 minutes."
            }, {
                text: "You have sixty seconds (1 minute) to make a selection when a food is presented"
            }, {
                text: "When 60 seconds expires, you have 2 attempts to Skip or Retry to make a selection"
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
            overrideMoreInfo: false
        },
        drugs: {
            id: 'drug-interaction',
            name: 'Drug Interaction',
            altName: 'Drug Interactions',
            motto: 'Safely Medicate',
            icon: 'images/scenarios/drugs.png',
            coumadinInfoSource: 'config',
            coumadinInfo: [
                {
                    text: "Many drugs that reduce pain, decrease fever, or decrease swelling due to cuts or injuries can make you bleed."
                }, {
                    text: "Always check with your doctor or pharmacist before taking any medications you buy for yourself."
                }
            ],
            rulesSource: 'config',
            rules: [
                {
                    text: "You will be given a medicine cabinet filled with other medications available from the store. Follow the instructions and place these medications in the medicine tray."
                }, {
                    text: "You earn 100 points for each correct choice and lose 100 points for each wrong choice."
                }, {
                    text: "Redo the selection until all medications are placed correctly."
                }, {
                    text: "You will earn a Proficiency Badge for being a hero caring for yourself."
                }
            ],
            trophyText: [{
                text: 'You\'ve earned enough points to earn a proficiency badge!'
            }, {
                text: 'You have earned your Proficiency Badge, which will display at the right corner of the Home screen the next time you play the game.'
            }, {
                text: 'Remember, you must always check with your doctor or pharmacist before you take any new medications'
            }],
            trophyImage: 'images/badges/drug-interaction.png',
            footerResetText: 'Clear Tray',
            overrideMoreInfo: true,
            moreInfoText: {
                coumadin: [
                    { text: 'You are advised to ask your doctor or pharmacist before taking any medications you buy from the store. Medications you buy store without your doctor’s prescription are called over-the-counter (OTC) medications. Some OTC medications may increase your risk of bleeding by making your blood too thin.' },
                    { text: 'You are advised to ask your doctor or pharmacist before taking any food or dietary supplements when you are on Coumadin. Some food supplements may increase your risk of bleeding by making your blood too thin while others can cause your blood to clot by making your blood too thick.'}
                ],
                rules: [
                    { text: 'The game consists of lists of over-the-counter medications, food supplements, and prescription medications that have different. Some have high levels of bleeding or clotting risk and some have low levels bleeding or clotting risk.' },
                    { text: 'Each item placed correctly is worth 100 points. You will lose 100 points for each wrong placement.' },
                    { text: 'A proficiency badge shows your level of progress. When you earn the badge it means you have very good knowledge of the level of the game.' }
                ],
                game: [
                    { text: 'Each medication placed correctly will disappear from the screen when you come back for more selection.' },
                    { text: 'Two medications will be presented one at a time until all items are placed correctly.' },
                    { text: 'The remaining items will appear in different order on the screen each time you come back for more selection until you place all of them correctly.' }
                ],
                results: [
                    { text: '' }
                ]
            }
        },
        blood: {
            id: 'pt-inr-monitoring',
            name: 'Blood Clotting Testing',
            altName: 'PT/INR Monitoring',
            motto: 'Test and monitor your INR!',
            icon: 'images/scenarios/ptinr.png',
            coumadinInfoSource: 'template',
            coumadinInfo: [
                {
                    text: "Your INR number depends on your diagnosis."
                },{
                    text: "Select the reason why you are taking Coumadin (you can select more than one reason):"   
                },{
                    text: "Your doctor uses your blood clotting number to set your Coumadin dose."
                }                
            ],
            rulesSource: 'config',
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
                    text: "You will earn a Proficiency Badge for being a hero caring for yourself."
            }],
            trophyText: [
                {
                    text: "You selected the right responses about all your INR numbers"
                },{
                    text: 'You\'ve earned enough points to earn a proficiency badge!'
                },{
                    text: 'You have earned your Proficiency Badge, which will display at the right corner of the Home screen the next time you play the game.'
                }, {
                    text: 'Remember, you must always check with your doctor or pharmacist when your INR numbers are too high or too low.'
                }
            ],
            trophyImage: 'images/badges/pt-inr-monitoring.png',
            overrideMoreInfo: true,
            moreInfoText: {
                coumadin: [{ text: 'Your blood clotting measure is called INR. When your INR is high, your blood is too thin and you can bleed. When your INR is low, your blood is too thick and your blood can clot. Your doctor use your blood clotting values to prescribe your Coumadin dose' }],
                rules: [{ text: 'Your doctor uses your diagnosis or the reason why you take Coumadin to set your INR number. Your INR number may not be the same as the other person.' }],
                game: [{ text: 'Pretend the INR numbers are the ones your doctor set for you. You are using these numbers only to play the game and does not represent your real INR numbers.' }],
                results: [{ text: 'A proficiency badge shows your level of progress. When you earn the badge it means you have very good knowledge of the level of the game.' }]
            }
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
        })
        /*.when('/diet',{
            controller: 'MinigameController',
            templateUrl: '/components/minigames/minigame.html',
            resolve: {
                minigameConfig: function() {
                    return {
                        name: 'Diet',
                        helpText: 'Drag food items on the plate.',
                        scenarios: [
                            scenarios.foods
                        ]
                    }
                }
            }
        })*/
        .when('/vitamin-k-foods', {
            controller: 'MinigameController',
            templateUrl: '/components/minigames/minigame.html',
            resolve: {
                minigameConfig: function() {
                    return {
                        name: 'Vitamin K Foods',
                        helpText: 'Drag food item to plate.',
                        scenarios: [
                            scenarios.vitaminkfood
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

app.run(function($rootScope, $location, $uibModal, Idle) {

    Idle.watch(); //being timeout watch as soon as application loads

    var standardModalInstance = null;
    var coumadinInfoModalInstance = null;

    $rootScope.activeScenario = "";

    $rootScope.userData = {
        name: 'Jimbo',
        score: 0
    };
    $rootScope.suppressDefaultMoreInfo = false;

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
        if (!$rootScope.suppressDefaultMoreInfo) {
            coumadinInfoModalInstance = doShowOverlay('/components/shared/coumadin-info.html', 'CoumadinInfoController', {}, {});
        } else {
            $rootScope.$broadcast('minigame:scenario:moreInfo');
        }
    }

    $rootScope.showCoumadinInfoOverrideOverlay = function(templateUrl, controller, scopeData) {
        console.log('showing coumadin info override overlay');
        coumadinInfoModalInstance = doShowOverlay(templateUrl, controller, scopeData || {}, {});
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

    $rootScope.goToLanding = function(action) {
        $rootScope.hideMessage();
        $rootScope.hideOverlay();
        $location.url('/landing');
        $rootScope.suppressDefaultMoreInfo = false;
        $rootScope.userData.score = 0;
        Idle.unwatch();
    };

    // Ask user to input their name
    $rootScope.username = null;
    var nameModalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/components/name-entry/name-entry.html',
        controller: 'NameEntryController',
        backdrop: 'static',
        keyboard: false
    });
    $rootScope.$on('app:username', function(event, username) {
        $rootScope.username = username;
        $rootScope.gamesDatabase = firebase.database().ref('/test/games');
        if (nameModalInstance) {
            nameModalInstance.close();
        }
    });    
});
