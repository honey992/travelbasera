"use strict";

var app = angular.module('travelBasera', ["ngRoute"]);

 

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider.when("/", {
            templateUrl: "/view/pages/login.html",
            controller: "userController"
        }).when("/dashboard", {
            templateUrl: "/view/dashboard.html",
            controller: "dashboardController"
        }).when("/users", {
            templateUrl: "/view/pages/users.html",
            controller: "userController"
        }).when("/viewUsers", {
            templateUrl: "/view/pages/viewUsers.html",
            controller: "manageUsersController"
        }).when("/userRoles", {
            templateUrl: "/view/pages/userRoles.html",
            controller: "userRolesController"
        })
        .otherwise({
            redirectTo: "/"
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

app.run(function ($rootScope, $location, $route,$document) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) { 
        // var userToekn = sessionStorage.getItem('token');
        // if(next.$$route.originalPath == "/");
        // $document[0].getElementById("nav").style.display = "none";
        //             //$rootScope.hideOnLogin = true;
        // if(!userToekn){
        //     $location.path('/');
        // }else{
            
        // }
  });
});