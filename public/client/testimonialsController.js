"use strict";

app.controller('testimonialsController', function($scope, $http,configuration,$location, fileUpload){

		$scope.viewData = true; 
	
		$scope.addNewReviewer = function(){
 			if($scope.addReviewerForm.$valid){ 
	            var file = $scope.myFile;
	            var details = $scope.rw; 
	            var uploadUrl = configuration.TESTIMONIAL_URL;
	           fileUpload.uploadFileToUrl(file, uploadUrl,details,'fromTest', function(d){
	            if(d){
	               $scope.successMsg = d.data.message;
	               $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.rw = {};
	               $scope.fetchReviews();
	            }else{
	            	 $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = err.data
	            }
	           }); 
          }
          else{
          	$scope.emptyForm=true
          }
		};

		$scope.fetchReviews = function(){ 
	            $http.get(configuration.TESTIMONIAL_URL).then(function success(res){
	            	 $scope.rwData = res.data.data;
	               
	            }, function failure(err){
 				$scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = err.data.message;
	            }) ;
          
		}
		$scope.fetchReviews();
});