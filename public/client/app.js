"use strict";

var app = angular.module('travelBasera', ["ngRoute",'angular-jwt','textAngular','ngFileUpload']);

 

app.config(["$routeProvider", "$locationProvider", "$httpProvider",'$provide',function ($routeProvider, $locationProvider, $httpProvider,$provide) {
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
        }).when("/testimonials", {
            templateUrl: "/view/pages/testimonials.html",
            controller: "testimonialsController"
        }).when("/packages", {
            templateUrl: "/view/pages/packages.html",
            controller: "packageController"
        }).when("/state", {
            templateUrl: "/view/pages/stateV.html",
            controller: "stateVController"
        }).when("/country", {
            templateUrl: "/view/pages/country.html",
            controller: "countryController"
        }).when("/editCountry/:id", {
            templateUrl: "/view/pages/edit-coutry.html",
            controller: "countryController"
        }).when("/inclusion", {
            templateUrl: "/view/pages/inclusion.html",
            controller: "inclusionController"
        }).when("/aboutUs", {
            templateUrl: "/view/pages/about.html",
            controller: "aboutController"
        }).when("/contactDetails", {
            templateUrl: "/view/pages/contactus.html",
            controller: "contactController"
        })
        .otherwise({
            redirectTo: "/"
        });
            $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

       $httpProvider.interceptors.push('authInterceptor');
       $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
                    // taRegisterTool('test', {
                    //     buttontext: 'Test',
                    //     action: function() {
                    //         alert('Test Pressed')
                    //     }
                    // });
                    // taOptions.toolbar[1].push('test');
                    // taRegisterTool('colourRed', {
                    //     iconclass: "fa fa-square red",
                    //     action: function() {
                    //         this.$editor().wrapSelection('forecolor', 'red');
                    //     }
                    // });
                    // add the button to the default toolbar definition
                    taOptions.toolbar = [['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
      ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']];
                    return taOptions;
                }]);
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
        this.uploadFileToUrl = function(file, uploadUrl,details,resource, cb){
        console.log('details=',details) 
           var fd = new FormData();
             fd.append('file', file);
             fd.append('status', details.status); 

           if(resource == 'banner'){ 
              fd.append('imageTitle', details.imageTitle); 
           }
           if(resource == 'fromTest'){
              fd.append('reviewer_name', details.name);
              fd.append('reviewer_title', details.title);
              fd.append('reviewer_desc', details.description);
              fd.append('reviewer_rating', details.rating); 
           }else if(resource == 'inclusion'){
            fd.append('i_name', details.name);
            fd.append('metadata.is_active', details.status);
           }
            
           $http.post(uploadUrl, fd, {transformRequest: angular.identity,headers: {'Content-Type': undefined} }) 
           .then(function (success){ 
                cb(success);
               },function (error){

               });
        }
     }]);

app.filter('statusName', function(){
  return function(str){
    var val;
    if(str == true || str == 'true') val = 'Yes'
      else if(str == false || str == 'false') val = 'No'
    return val;
  }
});

app.filter('splitId', function(){
  return function(id){
    var len = id.length;
    return id.substr(len-6, len);
  }
})

app.factory('authInterceptor', authInterceptor);

authInterceptor.$inject = ["$q","$location"];
function authInterceptor($q, $location) {
        return {
          // Add authorization token to headers
            request: function (config) {
             // get token from a cookie or local storage
            var token = sessionStorage.getItem('token');
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
            return config;
          },
          // Intercept 401s and redirect you to login
          responseError: function(response) {

            if(response.status === 401) {
             // redirect to some page

              // remove any stale tokens
              return $q.reject(response);
            }
            else {
              return $q.reject(response);
            }
          }
        };
      }
