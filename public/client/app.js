"use strict";

var app = angular.module('travelBasera', ["ngRoute"]);

 

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider.when("/", {
            templateUrl: "/view/pages/login.html",
            controller: "userController"
        }).when("/dashboard", {
            templateUrl: "/view/dashboard.html",
            controller: "userController"
        })
        .otherwise({
            redirectTo: "/"
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);