"use strict";

app.controller('userController', function($scope,$rootScope,$routeParams, $http,configuration,$location,jwtHelper,$timeout){
$scope.user = {};
$scope.successPop = false;
	$scope.viewData = true;
	$scope.toggelView = function(){
		$scope.viewData = !$scope.viewData;
	}
	var url = $location.url();
	 $scope.userLogin = function(){ 
			if($scope.loginForm.$valid){
		      $http.post(configuration.LOGIN_URL, $scope.user).then(function success(res){
	                    sessionStorage.setItem('token', res.data.token);
	                    document.getElementById('nav').style.display = 'block';
	                    $location.path('/dashboard').replace();
	                   
	                }, function errorCallback(err){
	                    $scope.errorPop = true;
	                    $scope.successPop = false;
	                   $scope.errorMsg = 'Email/Password Invalid';

	                });
		 }else{
		 	 
			angular.forEach($scope.loginForm.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });
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
	 
	};

	if(url == '/users' || url.split('/')[1] == 'editUser'){ 
		$scope.fetchRoles();
	};

	$scope.getMenusList = function(){
		$http.get('client/menus.json').then(function(res){
			$scope.da = res.data;
		})
	};
	$scope.getMenusList();

	$scope.getPermissionList = function(){
		$http.get('client/permissions.json').then(function(res){
			$scope.user.permissions = res.data;
			console.log(res.data);
		})
	};
	$scope.getPermissionList();
	 
	

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
	if(url == '/users' ){ 
		$scope.fetchUsers();
	}

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
	};
   console.log($location.url())

	$scope.editUser = function(id){
		$location.path('/editUser/'+id); 
	};

if($location.url().split('/')[1] == 'editUser'){
	var userId = $routeParams.id;
	 $http.get(configuration.FETCH_SINGLE_USER+"/"+userId).then(function success(res){
              $scope.singleUser  = res.data.result;
              
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
               $scope.errorMsg = err.data;

            });

	$scope.editUser = function(){
		 
		$http.put(configuration.UPDATE_USER_URL+"/"+userId, $scope.singleUser).then(function success(res){
               $scope.successMsg = res.data.message;
               $scope.successPop = true;
               $scope.errorPop = false;
               // $scope.singleUser = {};
               $scope.singleUser.permissions = $scope.user.permissions;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
               $scope.errorMsg = err.data;

            });
	}
};


$scope.deleteConfirmation = function(id){
	$scope.deleteId = id;
	$scope.deleteConfirmationModal = true;
}
	$scope.deleteUser = function(){ 
		$scope.id = $scope.deleteId ;
		$http.delete(configuration.DELETE_USER_URL+"/"+$scope.id).then(function success(res){
				$scope.successMsg = res.data.message;
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.fetchUsers();
		}, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
               $scope.errorMsg = err.data;

            });
	}

	

});