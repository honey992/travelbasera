"use strict";

app.controller('countryController', function($scope, $http,configuration,$location){

		var url = $location.url();
		$scope.viewData = true; 

		$scope.getAllCountry= function(role){ 
	      	$http.get(configuration.GET_ALL_COUNTRY_URL).then(function success(res){
               $scope.countryList = res.data.country;
            }, function errorCallback(err){
                $scope.invoiceError = true;
                $scope.invoiceErrorMsg = err.data.message; 

            });
		 
		};

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
		};

		if(url == '/country' ){ 
			$scope.getAllCountry();
		}
	

});