"use strict";

app.controller('userRolesController', function($scope, $http,configuration,$location){

		$scope.viewData = true;
		 $scope.addNewRole = function(){
			if($scope.addNewRoles.$valid){
				var reqObj = {r_name:$scope.role.name, is_active:$scope.role.status};
		      $http.post(configuration.ADD_ROLES_URL, reqObj).then(function success(res){
	                    console.log(res.data);
	                }, function errorCallback(err){
	                    $scope.invoiceError = true;
	                    $scope.invoiceErrorMsg = err.data.message; 

	                });
		 }else{
			alert('Requires')
		}
		}

		 $scope.fetchRoles = function(role){ 
		      $http.get(configuration.FETCH_ROLES_URL).then(function success(res){
	                   $scope.data = res.data.data;
	                }, function errorCallback(err){
	                    $scope.invoiceError = true;
	                    $scope.invoiceErrorMsg = err.data.message; 

	                });
		 
		}
		$scope.fetchRoles();
	

});