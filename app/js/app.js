'use strict';

var app = angular.module('CoumadinApp', [
    'ngRoute', 'permission', 'permission.ng',
]);

app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/views/main.html',
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
<<<<<<< HEAD
        .when('/scenario', {
            templateUrl: '/views/scenarios/scenario.html',
            // data: {
            //     permissions: {
            //         only: ['AUTHENTICATED'],
            //         redirectTo: '/login'
            //     }
            // }
        })
        .otherwise({ redirectTo: '/' });
})

// app.run(function(PermPermissionStore, PermRoleStore, $q) {


//     function Session(deferred) {
//         deferred.resolve();
//         // function checkSession() {
//         //     console.log('checkSession');

//         // }
//         // return {
//         // 	checkSession: checkSession
//         // };
//         console.log(deferred);
//         return deferred.promise;
//     }

//     var roleConfig = {
//         'AUTHENTICATED': $q.defer()
//     };


//     PermRoleStore
//     // Or use your own function/service to validate role
//         .defineRole(roleConfig, function(deferred) {
//         return deferred.promise; //Session;//.checkSession();
//     });
//         // deferred.reject();

//     setTimeout(function(deferred) { 
//     	console.log('timeout fired');
//         deferred.resolve(); 
//     }, 3000);

//     // var roleConfig = {
//     //     'Admin': $q.defer(),
//     //     'Auditor': $q.defer(),
//     //     'QA': $q.defer(),
//     //     'Lead': $q.defer(),
//     //     'Clerk': $q.defer(),
//     //     'Manager': $q.defer(),
//     //     'Internal': $q.defer(),
//     //     'External': $q.defer()
//     // };
//     // var roles = {};
//     // _.each(roleConfig, function(deferred, roleName) {
//     //     roles[roleName] = function() {
//     //         return deferred.promise;
//     //     };
//     // });

//     // PermRoleStore.defineManyRoles(roles);

//     // webservices.metadata.getLoggedInUser().then(function(response) {

//     //         _.each(roleConfig, function(deferred, roleName) {
//     //             var matchingRole = _.find(response.data.assignedRoles, function(role) {
//     //                 return role.name === roleName;
//     //             });
//     //             if (matchingRole) {
//     //                 deferred.resolve();
//     //             } else {
//     //                 deferred.reject();
//     //             }
//     //         });
//     //         angular.element('#main-tab-content').removeAttr('hidden');
//     //         angular.element('#main-tabs').removeAttr('hidden');

//     //     },
//     //     function(response) {
//     //         console.log("Unable to fetch role list on login: " + response.error.message);
//     //         angular.element('#permissions-error-msg').removeAttr('hidden');
//     //     });

// });


;
=======
        .when('/minigame', {
            templateUrl : '/views/minigames/minigame.html'
        });
});
>>>>>>> 493660e01332f6f9ec9e387a37d75243912719bb
