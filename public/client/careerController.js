"use strict";

app.controller('careerController', function($scope, $http,configuration,$location,fileUpload,$sce){

		$scope.viewData = true; 
  	$scope.toggelView = function(){
  		$scope.viewData = !$scope.viewData;
	   }
    $scope.career = {};

		 $scope.addOpening = function(){
		 	$scope.jobDescription = false;
		 	if($scope.careersForm.$valid){
        if(!$scope.career.description){
          $scope.jobDescription = true;
          return;
        }
        var reqObj = {
          job_title:$scope.career.title,
          job_location :$scope.career.location,
          job_function : $scope.career.function,
          job_experience : $scope.career.experience,
          job_description :$scope.career.description
        };
		 		$http.post(configuration.CAREER_URL, reqObj).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message; 
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			  });
		 	}else{
		 		angular.forEach($scope.careersForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
		 	}
		 	 
		 };

		 $scope.getJobs= function(){ 
	      	$http.get(configuration.CAREER_URL).then(function success(res){
               $scope.careerData = res.data.data; 
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getJobs();

		 $scope.updateAboutContent = function(){

		 	$scope.requiredDesc = false;
		 	if($scope.about.description){
		 		$http.put(configuration.ABOUT_US_URL, $scope.about).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getAboutus();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 	}else{
		 		$scope.requiredDesc = true;
		 	}
		 	 
		 }; 

     $scope.resetAll = function(){
      $scope.about = {};
      $scope.aboutusForm.$setPristine();
      $scope.aboutusForm.$setUntouched();
     }

});