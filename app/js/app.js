'use strict';

var app = angular.module('CoumadinApp', [
    'ngRoute', 'permission', 'permission.ng',
]);

app.config(function($routeProvider) {

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
		            	scenarios: ['eating']
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
		            	scenarios: ['flossing', 'toothbrushing']
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
		            	scenarios: ['bloody-stools', 'node-bleeds', 'cuts', 'falls']
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
		            	scenarios: ['pt-inr-monitoring']
		            };
	            }
            }
        })
        .otherwise({ redirectTo: '/' });
});
