
"use strict";

app.controller('packageController', function($scope, $http,configuration,$location,Upload,$sce){

		$scope.viewData = true;
		$scope.showHighlightError = false;
		$scope.itenaryError = false;
		$scope.packageTypes = [{name:'Domestic', code:'1'},{name:'International', code:'2'}];
		$scope.pack = {category :[],highlights:[], inclusions:[],itenary:[], inclusionList :[], exclusionList:[],paymentPolicy:[],cancellationPolicy:[],otherPolicy:[]};
		$scope.formErrors = {};
		$scope.openCategoryList = function(event){
			$scope.cat_list = true;
		    event.stopPropagation();
		}
		$scope.selectedObj = {}; 
		$scope.selectedCategories = '';
		
		$scope.selectOption = function(x, event){
			event.stopPropagation();
			if(!$scope.selectedObj[x.cat_code]){
				$scope.selectedObj[x.cat_code] = true;
			    $scope.pack.category.push(x.cat_code+'-'+x.cat_name);
			   if($scope.formErrors.category)   $scope.formErrors.category=false; 
			}else{ 
				$scope.selectedObj[x.cat_code] = false;
				var indx = $scope.pack.category.indexOf(x.cat_code+'-'+x.cat_name);
				 $scope.pack.category.splice(indx,1) 
			};  
			var d = [];
			$scope.pack.category.forEach(function(o){
				d.push(o.split('-')[1]);
			})
				$scope.selectedCategories = d.join(',') 
			
		};

		window.onclick = function() {
			if ($scope.cat_list) {
				$scope.cat_list = false; 
				$scope.$apply();
			}
		};


 		$scope.addmorehighlights = function(){
			if($scope.pack.highlights.length <= 4 && $scope.pack.highlightsTitle){
				$scope.showHighlightError = false;
				$scope.pack.highlights.push({title:$scope.pack.highlightsTitle});
				$scope.pack.highlightsTitle = '';
				if($scope.formErrors.highlights) $scope.formErrors.highlights=false;
			}else{
				$scope.showHighlightError = true;
				$scope.showHighlightErrorMsg = 'Please fill the field.';
			}
			
		}; 
		$scope.getInclusions= function(){ 
	      	$http.get(configuration.INCLUSION_URL).then(function success(res){
               $scope.incList = res.data.inclusions;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getInclusions();

		// $scope.getSourceCity = function(){
		// 	$http.get('client/sourceCity.json').then(function(res){
		// 		$scope.sourceCity = res.data;
		// 	})
		// };
		//$scope.getSourceCity();
		$scope.getSourceCities= function(){ 
	      	$http.get(configuration.CITY_URL).then(function success(res){
               $scope.sourceCity = res.data.cities;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getSourceCities(); 
		// $scope.sourceCity = [{code:"1", name:"Delhi"},{code:"2", name:"Mumbai"}];

		$scope.pack.selectedInclusion = [];
		$scope.selectInclusion = function(obj){
			$scope.pack.selectedInclusion.push({'i_name':obj.i_name, 'i_code':obj.i_code,'i_icon':obj.i_icon});
			$scope.incList = $scope.incList.filter(function(_p){
				return _p.i_code !== obj.i_code
			});
			$scope._inclusionList = false;
			if($scope.formErrors.selectedInclusion) $scope.formErrors.selectedInclusion=false; 
		};
		 $scope.removeHighlights = function(highLgts){ 
		 	  $scope.pack.highlights = $scope.pack.highlights.filter(function(o){ 
		 		return o.title != highLgts.title;
		 	});
		 	 

		 }
		$scope.removeInclusion = function(x){
			$scope.incList.push(x);
			$scope.pack.selectedInclusion = $scope.pack.selectedInclusion.filter(function(c){
				return c.i_code !== x.i_code;
			})
		};

		$scope.pack.itenary = [{title:'', description:''}];
		$scope.addItenary = function(){
			var lastItenary = $scope.pack.itenary[$scope.pack.itenary.length-1];
			var lastEmpty = false;
			for(var k in lastItenary){
				if(!lastItenary[k]) lastEmpty = true; 
			}
			if(!lastEmpty) $scope.pack.itenary.push({title:'', description:''});
			else{
				$scope.itenaryError = true;  
			} 
			if($scope.formErrors.itenary) $scope.formErrors.itenary=false;
		}
		$scope.removeItenary = function(index){
			$scope.pack.itenary.splice(index,1);
		}
		$scope.pack.discount = 'No';
		$scope.isDiscounted = function(val){
			if(val == 'Yes'){
				$scope.showDiscountForm = true;
			} 
			else{
				$scope.showDiscountForm = false;
				if($scope.discountImage || $scope.pack.discountRate){
					$scope.discountImage = '';
					$scope.pack.discountRate = '';
				}
			}  
		}

		$scope.getAllCountry = function(){ 
			showLoader()
	      	$http.get(configuration.GET_ALL_COUNTRY_URL).then(function success(res){
               $scope.countryList = res.data.country;
				hideLoader()               
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getAllCountry();

		$scope.getStateList = function(c_code){
			showLoader()
			$http.get(configuration.STATE_URL+"/"+c_code).then(function success(res){
               $scope.stateList = res.data.states;
               hideLoader()
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		}
		$scope.getCityByState = function(s_code){
				showLoader()
				$http.get(configuration.CITY_URL+"/"+s_code).then(function success(res){
               $scope.cityList = res.data.cities ;
               hideLoader()
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});

		}
		//$scope.cityList = [{city_name:'Shimla', city_code:'1'},{city_name:'Kanpur', city_code:'2'},{city_name:'Lucknow', city_code:'3'}]
		 
		 $scope.addmoreInclusions = function(){
			if($scope.inclusionTxt){
				$scope.pack.inclusionList.push($scope.inclusionTxt);
				$scope.inclusionTxt = '';
				if($scope.formErrors.inclusionDetails) $scope.formErrors.inclusionDetails=false;
			}
			
		};

		$scope.removeInclusionList = function(o){
			$scope.pack.inclusionList = $scope.pack.inclusionList.filter(function(f){
				return f !== o;
			});
		}
		 $scope.addmoreExclusion = function(){
			if($scope.excluionTxt){
				$scope.pack.exclusionList.push($scope.excluionTxt);
				$scope.excluionTxt = '';
				if($scope.formErrors.exclusionDetails) $scope.formErrors.exclusionDetails=false;
			}
			
		};
		$scope.removeExclusionList = function(o){
			$scope.pack.exclusionList = $scope.pack.exclusionList.filter(function(f){
				return f !== o;
			});
		};
      	$scope.fetchCategories = function(){
      	$http.get(configuration.CATEGORY_URL).then(function success(res){
      		$scope.catData = res.data.data;
      	},function errorCallback(err){
      		      $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = 'Unable to Get Category.'
      	})
      }

       $scope.fetchCategories(); 

		$scope.addPaymentPolicy = function($event, val){
			var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13 && val && $scope.pack.paymentPolicy.length<20) {
		    	$scope.pack.paymentPolicy.push(val);
		    	$scope.paymentPolicy = ''; 
		    	if ($scope.formErrors.paymentPolicy) $scope.formErrors.paymentPolicy=false;
		    }
			
		}
		$scope.removePaymentPolicy = function(i){
			if($scope.pack.paymentPolicy.length>1){
				$scope.pack.paymentPolicy.splice(i,1);
			}else{
				$scope.pack.paymentPolicy = [];
			}
		}
		$scope.addCancelPolicy = function($event, val){
			var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13 && val && $scope.pack.cancellationPolicy.length<20) {
		    	$scope.pack.cancellationPolicy.push(val);
		    	$scope.cancelPolicy = '';
		    	if ($scope.formErrors.cancellationPolicy)$scope.formErrors.cancellationPolicy=false; 
		    }
			
		}
		$scope.removeCancelPolicy = function(i){
			if($scope.pack.cancellationPolicy.length>1){
				$scope.pack.cancellationPolicy.splice(i,1);
			}else{
				$scope.pack.cancellationPolicy = [];
			}
		}
		$scope.addOtherPolicy = function($event, val){
			var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13 && val && $scope.pack.otherPolicy.length<20) {
		    	$scope.pack.otherPolicy.push(val);
		    	$scope.otherPolicy = ''; 
		    }
			
		}
		$scope.removeOtherPolicy = function(i){
			if($scope.pack.otherPolicy.length>1){
				$scope.pack.otherPolicy.splice(i,1);
			}else{
				$scope.pack.otherPolicy = [];
			}
		}

		function checkFormValidation(data){ 
			var resp = {};
			if(!data.category.length) resp.category = true;
			else resp.category = false;
			if(!data.highlights.length) resp.highlights = true;
			else resp.highlights = false;
			if(!data.selectedInclusion.length) resp.selectedInclusion = true;
			else resp.selectedInclusion = false;
			if(!data.itenary[0].title && !data.itenary[0].description) resp.itenary = true;
			else resp.itenary = false;
			if(!data.inclusionList.length) resp.inclusionDetails = true;
			else resp.inclusionDetails = false;
			if(!data.exclusionList.length) resp.exclusionDetails  = true;
			else resp.exclusionDetails  = false;
			if(!data.paymentPolicy.length) resp.paymentPolicy = true;
			else resp.paymentPolicy  = false;
			if(!data.cancellationPolicy.length) resp.cancellationPolicy = true;
			else resp.cancellationPolicy = false;
			if(!data.description) resp.description = true;
			else resp.description = false;
			if(data.discount == 'Yes'){
				if(!$scope.discountImage) resp.discountImage = true;
				else resp.discountImage = false;
				if(!data.discountRate) resp.discountRate = true;
				else resp.discountRate = false;
			}else{
				resp.discountImage = false;
				resp.discountRate = false;
			}
			var notValid = false;
			for(var k in resp){
				if(resp[k]) notValid = true;
			}
			if(notValid) resp.valid = false;
			else resp.valid = true;
			return resp;
		}


		$scope.saveNewPackage = function(mainImg,files,discountImages){
			console.log("data==", $scope.pack) 
			
			if($scope.addNewPackageForm.$valid ){ 
			var formValidation =  checkFormValidation($scope.pack);
			if(!formValidation.valid){
				$scope.formErrors = formValidation;
				return; 
			}
			
			 var fileArray = [mainImg,files];
			 if(discountImages) var fileArray = [mainImg,files,discountImages];
			 showLoader();
					Upload.upload({
					      url:configuration.PACKAGE_URL, 
					      arrayKey: '',
					      data: {data:JSON.stringify($scope.pack),file:fileArray} 
					    }).then(function (resp) {
					    	hideLoader()
		            			$scope.successPop = true;
			                   $scope.errorPop = false;
			                   $scope.successMsg = resp.data.message;
			        }, function (err) {
			                $scope.errorPop = true;
			                $scope.successPop = false;
			                $scope.errorMsg = err.data.message;
			        }, function (evt) {
			            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			        });
			 
				}else{
					angular.forEach($scope.addNewPackageForm.$error, function(error){
		               angular.forEach(error, function(control){
		                   control.$setTouched();
		               })      
			        });
					
				}
		} 
	$scope.uploadImages = function(files, packId){  
		if($scope.addNewPackageForm.$valid){   
			  Upload.upload({
			      url:configuration.PACKAGE_IMAGES_URL, 
			      arrayKey: '',
			      data: {data:packId,file: files} 
			    }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (err) {
            $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
		 

		}else{
				angular.forEach($scope.addNewPackageForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
		
	}
	}

	$scope.fetchAllPackages = function(){
			    $http.get(configuration.PACKAGE_URL).then(function success(res){  
			       	$scope.packData =  res.data.data || [];
			       }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			}); 
				 
					
		}
		$scope.fetchAllPackages();
 
	 var url = $location.path();
	 if(url == '/package-details'){
	 	var packId =  ($location.search() || {}).packageId;
	 	$http.get(configuration.PACKAGE_URL+'?packageId='+packId).then(function success(res){  
			       	$scope.packageDetails =  res.data.data[0] || {};
			       $scope.packageDetails.description =	$sce.trustAsHtml($scope.packageDetails.description[0].package_description);
			       }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			}); 
	 }

	 $scope.resetAll = function(){
		$scope.pack = {};
		$scope.pack = {highlights:[], inclusions:[],itenary:[], inclusionList :[], exclusionList:[]};
		$scope.pack.itenary = [{title:'', description:''}];
		$scope.getInclusions();
		$scope.pack.selectedInclusion = [];
		$scope.addNewPackageForm.$setPristine();
		$scope.addNewPackageForm.$setUntouched();
	};

	$scope.editPackage = function(id){
		$location.path('/edit-package/'+id);
	}

	$scope.deleteConfirmation = function(id){
		$scope.deleteId = id;
		$scope.deleteConfirmationModal = true;
	}
	
	$scope.deletePackage = function(){
		var obj = {id:$scope.deleteId};
		$http.delete(configuration.PACKAGE_URL+"/"+$scope.deleteId).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.deleteConfirmationModal = false;
               $scope.fetchAllPackages();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
	};

	
		
	 

});