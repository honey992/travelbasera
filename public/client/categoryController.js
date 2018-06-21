"use strict";

app.controller('categoryController', function($scope, $http,configuration,$location,Upload){

		$scope.viewData = true; 
    $scope.toggelView = function(){
    	$scope.fetchCategories();
		$scope.viewData = !$scope.viewData;
	}
		 $scope.addCategory = function(file){
		 	if($scope.addCategoryForm.$valid){ 
	           Upload.upload({
			      url:configuration.CATEGORY_URL, 
			      data: {data:$scope.cat,file: file} 
			    }).then(function (resp) {
			       $scope.resetAll();
		           $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.successMsg = resp.data.message;
		        }, function (resp) {
		             $scope.successPop = false;
		               $scope.errorPop = true;
		               $scope.successMsg = resp.data.message;
		        }, function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		        }); 
          }
          else{
          	angular.forEach($scope.addCategoryForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
          }
      };

      $scope.fetchCategories = function(){
      	$http.get(configuration.CATEGORY_URL).then(function success(res){
      		$scope.catData = res.data.data;
      	},function errorCallback(err){
      		      $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = 'Unable to Get Images.'
      	})
      }

       $scope.fetchCategories();


       $scope.editCategory = function(editableData){ 
			$scope.eData = editableData
			console.log($scope.eData,"KKKKKKKKKKK");
		};

    $scope.openEditPopup = function(x){
		x.metadata.is_active = x.metadata.is_active.toString();
		$scope.eData = angular.copy(x);
	}
	 $scope.updateCategory = function(file){
		 	if($scope.editCategoryForm.$valid){  
	           Upload.upload({
			      url:configuration.CATEGORY_URL, 
			      method : 'PUT',
			      data: {data:$scope.eData,file: file} 
			    }).then(function (resp) {
			       $scope.fetchCategories();
		           $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.successMsg = resp.data.message;
		        }, function (resp) {
		             $scope.successPop = false;
		               $scope.errorPop = true;
		               $scope.successMsg = resp.data.message;
		        }, function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		        }); 
          }
          else{
          	angular.forEach($scope.editCategoryForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
          }
      };

      $scope.deleteConfirmation = function(id){
		$scope.deleteId = id;
		$scope.deleteConfirmationModal = true;
	}
	$scope.deleteCategory = function(){
		var obj = {id:$scope.deleteId};
		$http.delete(configuration.CATEGORY_URL+"/"+$scope.deleteId).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.deleteConfirmationModal = false;
               $scope.fetchCategories();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
	}

	$scope.resetAll = function(){
		$scope.cat = {};
		$scope.file = null;
		$scope.addCategoryForm.$setPristine();
		$scope.addCategoryForm.$setUntouched();
	}
	

});