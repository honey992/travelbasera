"use strict";

app.controller('bannerController', function($scope, $http,configuration,$location,fileUpload){

		$scope.viewData = true; 

		 $scope.uploadBanners = function(){
		 	if($scope.uploadBanner.$valid){ 
	            var file = $scope.myFile;
	            var details = $scope.b; 
	            console.log(file);
	            var uploadUrl = configuration.UPLOAD_BANNER_URL;
	           fileUpload.uploadFileToUrl(file, uploadUrl,details, function(d){
	            if(d){
	               $scope.successMsg = d.data.message;
	               $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.b = {};
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

      $scope.fetchBanners = function(){
      	$http.get(configuration.FETCH_BANNERS_URL).then(function success(res){
      		$scope.imageData = res.data.data;
      	},function errorCallback(err){
      		 $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = 'Unable to Get Images.'
      	})
      }

       $scope.fetchBanners();
	

});