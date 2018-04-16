"use strict";

app.controller('countryController', function($scope, $http,configuration,$location){

		$scope.viewData = true; 

		$scope.addNewCountry = function(){ 
			if($scope.newCountry.$valid){
				var reqObj = {c_name:$scope.role.name};
		      $http.post(configuration.ADD_COUNTRY_URL, reqObj).then(function success(res){
	                    console.log(res.data);
	                }, function errorCallback(err){
	                    $scope.invoiceError = true;
	                    $scope.invoiceErrorMsg = err.data.message; 

	                });
		 }
	}

	

});