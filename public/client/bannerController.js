"use strict";

app.controller('bannerController', function($scope, $http,configuration,$location,fileUpload){

		$scope.viewData = true; 
$scope.toggelView = function(){
		$scope.viewData = !$scope.viewData;
	}
		 $scope.uploadBanners = function(){
		 	if($scope.uploadBannerForm.$valid){ 
	            var file = $scope.myFile;
	            var details = $scope.b; 
	            
	            var uploadUrl = configuration.UPLOAD_BANNER_URL;
	           fileUpload.uploadFileToUrl(file, uploadUrl,details,'banner', function(d){
	            if(d){
	               $scope.successMsg = d.data.message;
	               $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.b = {};
	            }else{
	            	 $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = err.data.message;
	            }
	           }); 
          }
          else{
          	angular.forEach($scope.uploadBannerForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
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

    $scope.openEditPopup = function(x){
		x.metadata.is_active = x.metadata.is_active.toString();
		$scope.eData = x;
	}
	$scope.updateBanners = function(){
		 	if($scope.updateBannerForm.$valid){ 
	            var file = $scope.myFile;
	            var details = $scope.eData; 
	            
	            var uploadUrl = configuration.UPLOAD_BANNER_URL;
	           fileUpload.uploadFileToUrl(file, uploadUrl,details,'banner', function(d){
	            if(d){
	               $scope.successMsg = d.data.message;
	               $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.b = {};
	            }else{
	            	 $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = err.data.message;
	            }
	           }); 
          }
          else{
          	angular.forEach($scope.updateBannerForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
          }
      };

      $scope.deleteConfirmation = function(id){
		$scope.deleteId = id;
		$scope.deleteConfirmationModal = true;
	}
	$scope.deleteBanner = function(){
		var obj = {id:$scope.deleteId};
		$http.delete(configuration.UPLOAD_BANNER_URL+"/"+$scope.deleteId).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.deleteConfirmationModal = false;
               $scope.fetchBanners();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
	}
	

});