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
    {
        id: 'asparagus',
        name: 'Asparagus',
        kLevel: 2,
        src: "images/food-graphics/asparagus.png"
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
    {
        id: 'cabbage',
        name: 'Cabbage',
        kLevel: 2,
        src: "images/food-graphics/cabbage.png"
    },
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
            // instructions: 'Drag foods from the table down onto your plate to make your dinner plate. But make sure not to choose too much Vitamin K!',
            //instructions: "These food items contain varying amounts of Vitamin K. Make your dinner plate by dragging and dropping the food item on your plate. You can tap the food icon to display the name and for more information about the food.",
            instructions: [
                {
                    title: "Game Instructions", 
                    text: "These food items contain varying amounts of Vitamin K. Make your dinner plate by dragging and dropping the food item on your plate. You can tap the food icon to display the name and for more information about the food."
                }, {
                    title: "Additional Help",
                    text: "Click on the food items to see additional information."
                }
            ],    
            foodItems: foodItems
        },
        flossing: {
            id: 'flossing',
            name: 'Flossing',
            instructions: [
                {
                    title: "Game Instructions", 
                    text: "Choose a type of floss to use. But be careful not to pick one that could cause bleeding!"
                }
            ]
        },
        toothbrushing: {
            id: 'toothbrushing',
            name: 'Toothbushing',
            instructions: [
                {
                    title: "Game Instructions", 
                    text: "Choose a type of toothbrush to use. But be careful not to pick one that could cause bleeding!"
                }
            ]
        },
        bloodyStools: {
            id: 'bloody-stools',
            name: 'Bloody Stools',
            instructions: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ]
        },
        nodeBleeds: {
            id: 'node-bleeds',
            name: 'Nose Bleeds',
            instructions: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ]
        },
        cuts: {
            id: 'cuts',
            name: 'Cuts',
            instructions: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ]
        },
        falls: {
            id: 'falls',
            name: 'Falls',
            instructions: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ]
        },
        ptInrMonitoring: {
            id: 'pt-inr-monitoring',
            name: 'PT/INR Monitoring',
            instructions: [
                {
                    title: "Game Instructions", 
                    text: "N/A"
                }
            ]
        }
    };

    // Set up routing
    $routeProvider
        .when('/', {
            templateUrl: '/components/shared/landing-page.html',
            controller: 'LandingPageController',
            resolve: {
                configData: function(){
                    return {
                        helpText: 'Select an Item'
                    }
                }
            }
        })
        .when('/launch', {
            templateUrl: '/components/shared/minigame-launch.html',
            controller: 'MiniGameLaunchController'
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
        .when('/safety', {
        	controller: 'MinigameController',
            templateUrl: '/components/minigames/minigame.html',
            resolve: {
            	minigameConfig: function() {
            		return {
	            		name: 'Safety',
		            	scenarios: [
                            scenarios.bloodyStools,
                            scenarios.nodeBleeds,
                            scenarios.cuts,
                            scenarios.falls,
                            scenarios.flossing,
                            scenarios.toothbrushing
                        ]
		            };
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
        score: 0
    };

    $rootScope.information = [{
        title: 'What is warfarin (Coumadin®)?',
        html_desc: "Warfarin, also called Coumadin®, is a prescription medication that prevents the formation of blood clots. This is called an \“anticoagulant\” or \“blood thinner.\""
    }, {
        title: 'What is warfarin used for?',
        html_desc: "Warfarin is used to treat various medical problems but most frequently used to prevent strokes and blood clots in veins and arteries."
    }, {
        title: 'How is warfarin monitored?',
        html_desc: "<p>A blood test called the International Normalized Ratio (PT/INR) is used to measure the effect of warfarin.</p><p>In most cases, the PT/INR goal is between 2.0 and 3.0. Your doctor will tell you what your “goal” PT/INR range is.</p><p>If your PT/INR is below your goal, your blood is too thick and you are at risk of having a clot.</p><p>If your PT/INR is above your goal, your blood is too thin and you are at risk for bleeding.</p><p>It is extremely important that you go to all of your scheduled doctor or clinic appointments and PT/INR tests to make sure you are safe taking this medicine.</p>"
    }, {
        title: 'What is the normal warfarin dose?',
        html_desc: "The dose is individualized and based on the results of your blood test or PT/INR.</p><p>Your dose may change and be different on various days of the week.</p><p>It is very important you follow the warfarin dose schedule carefully and take it exactly as your doctor or clinic told you.</p><p>If you miss a dose, call your doctor or clinic to know what to do. Do not change the dose of warfarin on your own to make up for a dose you missed."
    }, {
        title: 'What are the most important side effects?',
        html_desc: "Bleeding is the major side effect you need to watch. Signs of bleeding are: <ul><li>Bleeding from the gums and nosebleeds.</li><li>Vomiting blood, blood in the urine and bloody or dark stools.</li><li>If you see any large amounts of blood that does not stop after a few minutes, you should call 911 or go to your nearest emergency room.</li></ul>"
    }, {
        title: 'What medicines get in the way of warfarin?',
        html_desc: "<p>Many medicines can interfere with warfarin including some over-the-counter medicines, herbal products, and antibiotics. It is very important to tell your doctor or pharmacist about all medicines you are taking and any changes made to them.</p><p>These medicines may change the PT/INR and your dose of warfarin may need to be adjusted."
    }, {
        title: 'What foods interact with warfarin?',
        html_desc: "<p>Vitamin K is found in many foods and nutritional supplements. Vitamin K may cause warfarin to be less effective (reduces your “PT/INR” and then your blood may be too thick).</p><p>While it is not necessary to avoid foods high on vitamin K, it is important to eat the same amounts every week and avoid large portions.</p>"
    }, {
        title: 'Description of Vitamin K',
        html_desc: "<p>Vitamin K is classified as a fat-soluble vitamin. The \"K\" is derived from the German word \"koagulation.\"</p><p>Vitamin K is used in the body to control blood clotting and is essential for synthesizing the liver protein that controls the clotting. It is involved in creating the important prothrombin, which is the precursor to thrombin - a very important factor in blood clotting. It is also involved in bone formation and repair. In the intestines it also assists in converting glucose to glycogen, this can then be stored in the liver. There are some indications that Vitamin K may decrease the incidence or severity of osteoporosis and slow bone loss.</p>"
    }, {
        title: 'Important information to know when you are taking Coumadin® and Vitamin K',
        html_desc: "The food you eat can affect how your medicine works. It is important to learn about possible interactions between drugs and nutrients for any medicine you take.</p><p><strong>Extremely Important</strong></p><p>Although it is generally thought that foods with Vitamin K are all you need to be concerned about if you\'re taking Coumadin or Warfarin, the following should also be taken into account despite grapefruit being very low in Vitamin K</p>"
    }, {
        title: 'Grapefruit Interactions',
        html_desc: "Grapefruit, whether in whole fruit or in juice form, contains chemicals that can interfere with the enzymes that break down Coumadin in the body. This could cause the drug to build up in the bloodstream, leading to an unintentional overdose of the medication."
    }
    ];

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
