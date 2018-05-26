"use strict";

app.controller('inclusionController', function($scope, $http,configuration,$location,fileUpload){

		$scope.viewData = true;

		$scope.addInclusion = function(){
			if($scope.inclusionForm.$valid){
				var file = $scope.myFile;
	            var details = $scope.inc; 
	            
	            var uploadUrl = configuration.INCLUSION_URL;
	           fileUpload.uploadFileToUrl(file, uploadUrl,details,'inclusion', function(d){
	            if(d){
	               $scope.successMsg = d.data.message;
	               $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.inc = {};
	            }else{
	            	 $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = err.data.message;
	            }
	           });
			}else{
				angular.forEach($scope.inclusionForm.$error, function(error){
	               angular.forEach(error, function(control){
	                   control.$setTouched();
	               })
               
           });
			} 
		};

		$scope.getInclusions  = function(){
		$http.get(configuration.INCLUSION_URL).then(function success(res){
      		$scope.inclusionData = res.data.inclusions;
      	},function errorCallback(err){
      		 $scope.errorPop = true;
            $scope.successPop = false;
           $scope.errorMsg = err.data.message;
      	})
		};
		$scope.getInclusions();

	$scope.deleteConfirmation = function(id){
		$scope.deleteId = id;
		$scope.deleteConfirmationModal = true;
	}
	
	$scope.deleteInclusion = function(){
		var obj = {id:$scope.deleteId};
		$http.delete(configuration.INCLUSION_URL+"/"+$scope.deleteId).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.deleteConfirmationModal = false;
               $scope.getInclusions();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
	}
		 
	

});