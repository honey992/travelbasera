"use strict";

var app = angular.module('travelBasera', ["ngRoute",'angular-jwt']);

 

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider.when("/", {
            templateUrl: "/view/pages/login.html",
            controller: "userController"
        }).when("/dashboard", {
            templateUrl: "/view/dashboard.html",
            controller: "dashboardController"
        }).when("/profile", {
            templateUrl: "/view/pages/profile.html",
            controller: "userController"
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

app.run(function ($rootScope, $location, $route,$document,jwtHelper) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) { 
        var userToken = sessionStorage.getItem('token');
        if(next.$$route.originalPath == "/") $rootScope.hideOnLogin = true;
        else $rootScope.hideOnLogin = false;

        if(userToken){
             $rootScope.loggedInUser = jwtHelper.decodeToken(userToken);
             console.log( $rootScope.loggedInUser) 
        }else{
            $location.path('/');
        }
  });
});