"use strict";

app.controller('userController', function($scope,$rootScope, $http,configuration,$location,jwtHelper,$timeout){
$scope.user = {};
$scope.successPop = false;
	$scope.viewData = true;
	 $scope.userLogin = function(){ 
			if($scope.loginForm.$valid){
		      $http.post(configuration.LOGIN_URL, $scope.user).then(function success(res){
	                    sessionStorage.setItem('token', res.data.token);
	                    $location.path('/dashboard');
	                   
	                }, function errorCallback(err){
	                    $scope.errorPop = true;
	                    $scope.successPop = false;
	                   $scope.errorMsg = 'Email/Password Invalid';

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

	$scope.da = [{name:'Users'},{name:'Packages'},{name:'Roles'}]
	$scope.user.permissions = {
		Users:{
			add:false,
			edit:false,
			view:false,
			delete:false
		},
		Packages:{
			add:false,
			edit:false,
			view:false,
			delete:false
		},
		Roles:{
			add:false,
			edit:false,
			view:false,
			delete:false
		}
	}; 
	

	$scope.addNewUser = function(newUser){
			if($scope.addnewUserForm.$valid){
		      $http.post(configuration.SIGN_UP_URL, $scope.user).then(function success(res){
		      	$scope.user = {permissions:$scope.user.permissions};
	                   $scope.successPop = true;
	                   $scope.errorPop = false;
	                   $scope.successMsg = res.data.message;
	                }, function errorCallback(err){
	                    $scope.errorPop = true;
	                    $scope.successPop = false;
	                   $scope.errorMsg = err.data;

	                });
		 }else{
			alert('Requires')
		}
	}

	$scope.fetchUsers = function(newUser){

		      $http.get(configuration.FETCH_USERS_URL).then(function success(res){
	                   $scope.userData = res.data.users;
	                }, function errorCallback(err){
	                    $scope.errorPop = true;
	                    $scope.successPop = false;
	                   $scope.errorMsg = err.data;

	                });
	}
	$scope.fetchUsers();

	$scope.logout = function(){
		var token = sessionStorage.getItem('token');
		if(token){
			sessionStorage.removeItem('token');
			$location.path('/');
		} 
	};

	$scope.getPermission = function(menuName, type){
		if($rootScope.loggedInUser) var permissions = $rootScope.loggedInUser.permissions;
		else return;

		for(var k in permissions){
			if(k == menuName.toLowerCase()){
				if(permissions[k][type]){
					return "Yes"
				}else{
					return 'No'
				}
			}
		}
	};
	$scope.getRoleName = function(r_code){
		var d = $scope.rolesList.filter(function(e){
			return e.r_code == r_code;
		});
		return d.r_name;
	}
	$scope.changePassword = function(){
		$scope.u._id = $rootScope.loggedInUser._id; 
		 $http.put(configuration.CHANGE_PASSWORD_URL, $scope.u).then(function success(res){
               $scope.successMsg = res.data.message;
               $scope.successPop = true;
               $scope.errorPop = false;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
               $scope.errorMsg = err.data;

            });
	}

});