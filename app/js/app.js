'use strict';

var app = angular.module('CoumadinApp', [
    'ngRoute'
]);

app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'main.html'
        })
        .when('/scenario', {
            templateUrl : '/views/scenarios/scenario.html'
        });
});
