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
        }).when("/editUser/:id", {
            templateUrl: "/view/pages/edit-user.html",
            controller: "userController"
        }).when("/banners", {
            templateUrl: "/view/pages/banners.html",
            controller: "bannerController"
        })
        .otherwise({
            redirectTo: "/"
        });
            $locationProvider.html5Mode({
            enabled: false,
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
             console.log( "LoggedIn User=",$rootScope.loggedInUser) 
        }else{
            $location.path('/');
        }
  });
});


app.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
 
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);
 app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl,details, cb){
        console.log('details=',details) 
           var fd = new FormData();
           fd.append('file', file);  
           fd.append('imageTitle', details.imageTitle);
           fd.append('status', details.status);  
           $http.post(uploadUrl, fd, {transformRequest: angular.identity,headers: {'Content-Type': undefined} }) 
           .then(function (success){ 
                cb(success);
               },function (error){

               });
        }
     }]);
