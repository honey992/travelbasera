"use strict";

app.controller('bannerController', function($scope, $http,configuration,$location,fileUpload){

		$scope.viewData = true; 
$scope.toggelView = function(){
		$scope.viewData = !$scope.viewData;
	}
		 $scope.uploadBanners = function(){
		 	if($scope.uploadBanner.$valid){ 
	            var file = $scope.myFile;
	            var details = $scope.b; 
	            console.log(file);
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

    $scope.openEditPopup = function(x){
		x.metadata.is_active = x.metadata.is_active.toString();
		$scope.eData = x;
	}
	$scope.updateState = function(obj){
		if($scope.updateStateForm.$valid){
			$http.put(configuration.STATE_URL, obj).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getStates();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data;
 			});
		}else{
			angular.forEach($scope.updateStateForm.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });

		}
		
	};
	

});