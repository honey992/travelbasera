"use strict";

app.controller('aboutController', function($scope, $http,configuration,$location,fileUpload,$sce){

		$scope.viewData = true; 
	$scope.toggelView = function(){
		$scope.viewData = !$scope.viewData;
	}
$scope.about = {};

		 $scope.addAbout = function(){
      showLoader()
		 	$scope.requiredDesc = false;
      $scope.requiredSortDesc = false;
		 	if($scope.about.description && $scope.about.sortDescription){
		 		$http.post(configuration.ABOUT_US_URL, $scope.about).then(function success(res){
            hideLoader()
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getAboutus();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 	}else{
		 		$scope.requiredDesc = true;
        if(!$scope.about.sortDescription) $scope.requiredSortDesc = true;
		 	}
		 	 
		 };

		 $scope.getAboutus= function(){ 
      showLoader()
	      	$http.get(configuration.ABOUT_US_URL).then(function success(res){
               hideLoader()
               $scope.aboutUsData = res.data.data;
               $scope.aboutCb = $sce.trustAsHtml($scope.aboutUsData.description);
               $scope.editAbout = false;
               for(var k in $scope.aboutUsData){
               	if( k == 'description' && $scope.aboutUsData[k]){
               		$scope.editAbout = true;
               		$scope.about = $scope.aboutUsData;
               	} 
               }
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getAboutus();

		 $scope.updateAboutContent = function(){

		 	$scope.requiredDesc = false;
		 	if($scope.about.description){
		 		$http.put(configuration.ABOUT_US_URL, $scope.about).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getAboutus();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 	}else{
		 		$scope.requiredDesc = true;
		 	}
		 	 
		 }; 

     $scope.resetAll = function(){
      $scope.about = {};
      $scope.aboutusForm.$setPristine();
      $scope.aboutusForm.$setUntouched();
     }

});