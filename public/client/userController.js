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
                   	return _o.metadata.is_active == true;
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
	 
	$scope.matchPassword = function(password, cnfpassword){
     $scope.samePasswordError = false
	  if(password != cnfpassword){
		$scope.samePasswordError = true 
	   }
    }

	$scope.addNewUser = function(newUser){
			if($scope.addnewUserForm.$valid && !$scope.samePasswordError){
		      $http.post(configuration.SIGN_UP_URL, $scope.user).then(function success(res){
		      		   $scope.resetAll();
		      		   $scope.fetchUsers();
	                   $scope.successPop = true;
	                   $scope.errorPop = false;
	                   $scope.successMsg = res.data.message;
	                }, function errorCallback(err){
	                    $scope.errorPop = true;
	                    $scope.successPop = false;
	                   $scope.errorMsg = err.data.message;

	                });
		 }else{
			angular.forEach($scope.addnewUserForm.$error, function(error){
	               angular.forEach(error, function(control){
	                   control.$setTouched();
	               })
               
           });
		}
	}

	$scope.fetchUsers = function(){ 
		      $http.get(configuration.FETCH_USERS_URL).then(function success(res){
	                   $scope.userData = res.data.users;
	                }, function errorCallback(err){
	                    $scope.errorPop = true;
	                    $scope.successPop = false;
	                    $scope.errorMsg = err.data.message;

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
               $scope.errorMsg = err.data.message;

            });
	};
	$scope.editUser = function(id){
		$location.path('/editUser/'+id); 
		$scope.viewData = false;
	};

if($location.url().split('/')[1] == 'editUser'){
	$scope.userId = $routeParams.id;
	 $http.get(configuration.FETCH_SINGLE_USER+"/"+$scope.userId).then(function success(res){
              $scope.singleUser  = res.data.result;
              $scope.singleUser.status = Boolean(res.data.result.metadata.is_active);
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
               $scope.errorMsg = err.data.message;

            });

$scope.editUser = function(){
	if($scope.editUserForm.$valid){
		$http.put(configuration.UPDATE_USER_URL+"/"+$scope.userId, $scope.singleUser).then(function success(res){
               $scope.successMsg = res.data.message;
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.singleUser.permissions = $scope.user.permissions;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
               $scope.errorMsg = err.data.message;

            });
		}else{
			angular.forEach($scope.editUserForm.$error, function(error){
	               angular.forEach(error, function(control){
	                   control.$setTouched();
	               })
               
           });
		}
	}
	
};
$scope.goToUser = function(){
		$location.path('/users'); 
	}


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
               $scope.deleteConfirmationModal = false;
               $scope.fetchUsers();
		}, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
               $scope.errorMsg = err.data.message;

            });
	}

	$scope.resetAll = function(){
		$scope.user = {};
		$scope.user.permissions = {};
		$scope.addnewUserForm.$setPristine();
		$scope.addnewUserForm.$setUntouched();
	}

	$scope.resetEditAll = function(){
		$scope.singleUser = {};
		$scope.singleUser.permissions = {};
		$scope.editUserForm.$setPristine();
		$scope.editUserForm.$setUntouched();
	}

	

});
