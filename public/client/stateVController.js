"use strict";

app.controller('stateVController', function($scope, $http,configuration,$location,$routeParams){
		$scope.successPop = false;
		var url = $location.url();
		$scope.viewData = true; 

	$scope.getAllCountry= function(){ 
	      	$http.get(configuration.GET_ALL_COUNTRY_URL).then(function success(res){
               $scope.countryList = res.data.country;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data;
 			});
		 
		};
	$scope.getAllCountry();

	$scope.addNewState = function(){
		if($scope.addStateForm.$valid){
			alert(JSON.stringify($scope.state));
		}else{
			
		}
		
	}
});