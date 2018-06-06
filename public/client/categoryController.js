"use strict";

app.controller('categoryController', function($scope, $http,configuration,$location,Upload){

		$scope.viewData = true; 
    $scope.toggelView = function(){
    	$scope.fetchCategories();
		$scope.viewData = !$scope.viewData;
	}
		 $scope.addCategory = function(file){
		 	if($scope.addCategoryForm.$valid){ 
	           Upload.upload({
			      url:configuration.CATEGORY_URL, 
			      data: {data:$scope.cat,file: file} 
			    }).then(function (resp) {
			       $scope.resetAll();
		           $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.successMsg = resp.data.message;
		        }, function (resp) {
		             $scope.successPop = false;
		               $scope.errorPop = true;
		               $scope.successMsg = resp.data.message;
		        }, function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		        }); 
          }
          else{
          	angular.forEach($scope.addCategoryForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
          }
      };

      $scope.fetchCategories = function(){
      	$http.get(configuration.CATEGORY_URL).then(function success(res){
      		$scope.catData = res.data.data;
      	},function errorCallback(err){
      		      $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = 'Unable to Get Images.'
      	})
      }

       $scope.fetchCategories();

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

	$scope.resetAll = function(){
		$scope.cat = {};
		$scope.file = null;
		$scope.addCategoryForm.$setPristine();
		$scope.addCategoryForm.$setUntouched();
	}
	

});