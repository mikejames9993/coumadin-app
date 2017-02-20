'use strict';

var app = angular.module('CoumadinApp', [
    'ngRoute'
]);

app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'main.html'
        })
        .when('/minigame', {
            templateUrl : '/views/minigames/minigame.html'
        });
});
