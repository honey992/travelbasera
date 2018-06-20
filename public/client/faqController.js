"use strict";

app.controller('faqController', function($scope,$http,configuration,$location){
    $scope.viewData = true; 
    $scope.errorShow = false;
    $scope.toggelView = function(){
        $scope.viewData = !$scope.viewData;
    }

    $scope.getAllFaq= function(){ 
            $http.get(configuration.FAQ_URL).then(function success(res){
               $scope.faqList = res.data.data;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
            });
         
        };

        $scope.getAllFaq();


    $scope.addNewFaq = function(file){
            if($scope.addFaqForm.$valid){ 
               $http.post(configuration.FAQ_URL, $scope.faq).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.resetAll()
               $scope.getAllFaq();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
            });
          }
          else{
            angular.forEach($scope.addFaqForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
          }
      };

      $scope.updateFaq = function(){
            if($scope.updateFaqForm.$valid){ 
               $http.put(configuration.FAQ_URL, $scope.eData).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getAllFaq();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
            });
          }
          else{
            angular.forEach($scope.updateFaqForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
          }
      };

      $scope.deleteFaq = function(){
        var obj = {id:$scope.deleteId};
        $http.delete(configuration.FAQ_URL+"/"+$scope.deleteId).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.deleteConfirmationModal = false;
               $scope.getAllFaq();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
            });
    }

      $scope.openEditPopup = function(x){
        x.metadata.is_active = x.metadata.is_active.toString();
        $scope.eData = angular.copy(x);
    }
    $scope.openAnsEditPopup = function(answer){
        $scope.answer = answer;
    }

      $scope.deleteConfirmation = function(id){
        $scope.deleteId = id;
        $scope.deleteConfirmationModal = true;
    }

      $scope.resetAll = function(){
        $scope.faq = {};
        $scope.addFaqForm.$setPristine();
        $scope.addFaqForm.$setUntouched();
    }

});