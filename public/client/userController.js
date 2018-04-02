"use strict";

app.controller('userController', function($scope, $http,configuration,$location){
$scope.user = {};
	$scope.viewData = true;
	 $scope.userLogin = function(){ 
			if($scope.loginForm.$valid){
		      $http.post(configuration.LOGIN_URL, $scope.user).then(function success(res){
	                    sessionStorage.setItem('token', res.data.token);
	                    $location.path('/dashboard');
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
                   $scope.rolesList = res.data.data.filter(function(_o){
                   	return _o.is_active == true;
                   });
                }, function errorCallback(err){
                    $scope.invoiceError = true;
                    $scope.invoiceErrorMsg = err.data.message; 

                });
	 
	}
	$scope.fetchRoles();

	$scope.da = [{name:'packages'},{name:'about'}]
	$scope.user.permissions = [{
		packages:{
			add:false,
			edit:false,
			view:false,
			delete:false
		}},
		{
			about:{
			add:false,
			edit:false,
			view:false,
			delete:false
		}
	}]; 

	$scope.addNewUser = function(newUser){
			if($scope.addnewUserForm.$valid){
		      $http.post(configuration.SIGN_UP_URL, $scope.user).then(function success(res){
	                   console.log("Resgiter==", res.data);
	                }, function errorCallback(err){
	                    $scope.invoiceError = true;
	                    $scope.invoiceErrorMsg = err.data.message; 

	                });
		 }else{
			alert('Requires')
		}
	}
	

});