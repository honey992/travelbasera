"use strict";

app.controller('bannerController', function($scope, $http,configuration,$location,fileUpload,Upload){
		$scope.viewData = true; 
		$scope.toggelView = function(){
				$scope.viewData = !$scope.viewData;
			}

		 $scope.uploadBanners = function(){
		 	if($scope.uploadBannerForm.$valid){ 
	            var file = $scope.b.myFile;
	            var details = $scope.b; 
	            var uploadUrl = configuration.UPLOAD_BANNER_URL;
	           fileUpload.uploadFileToUrl(file, uploadUrl,details,'banner', function(d){
	            if(d){
	               $scope.successMsg = d.data.message;
	               $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.b = {};
	               $scope.fetchBanners();
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

	$scope.editBanner = function(editableData){ 
			$scope.eData = editableData
			console.log($scope.eData,"KKKKKKKKKKK");
		};

	$scope.updateBanner = function(file){
		 	if($scope.editBannerForm.$valid){  
	           Upload.upload({
			      url:configuration.UPLOAD_BANNER_URL, 
			      method : 'PUT',
			      data: {data:$scope.eData,file: file} 
			    }).then(function (resp) {
			       $scope.fetchBanners();
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
          	angular.forEach($scope.editBannerForm.$error, function(error){
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