"use strict";

app.controller('aboutController', function($scope, $http,configuration,$location,fileUpload){

		$scope.viewData = true; 
	$scope.toggelView = function(){
		$scope.viewData = !$scope.viewData;
	}
$scope.about = {};

		 $scope.addAbout = function(){

		 	$scope.requiredDesc = false;
		 	if($scope.about.description){
		 		$http.post(configuration.ABOUT_US_URL, $scope.about).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data;
 			});
		 	}else{
		 		$scope.requiredDesc = true;
		 	}
		 	 
		 };

		 $scope.getAboutus= function(){ 
	      	$http.get(configuration.ABOUT_US_URL).then(function success(res){
               $scope.aboutUsData = res.data.data;
               $scope.editAbout = false;
               for(var k in $scope.aboutUsData){
               	if( k == 'description' && $scope.aboutUsData[k]){
               		$scope.editAbout = true;
               		$scope.about = $scope.aboutUsData;
               	} 
               }
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data;
 			});
		 
		};
		$scope.getAboutus();

		 $scope.updateAboutContent = function(){

		 	$scope.requiredDesc = false;
		 	if($scope.about.description){
		 		$http.put(configuration.ABOUT_US_URL, $scope.about).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data;
 			});
		 	}else{
		 		$scope.requiredDesc = true;
		 	}
		 	 
		 }; 

});