"use strict";

app.controller('editPackageController', function($scope, $http,configuration,$location,Upload,$sce,$routeParams){

		$scope.viewData = true;
		$scope.showHighlightError = false;
		$scope.itenaryError = false;
		$scope.packageTypes = [{name:'Domestic', code:'1'},{name:'International', code:'2'}];
		$scope.pack = {category :[],highlights:[], inclusions:[],itenary:[], inclusionList :[], exclusionList:[],paymentPolicy:[],cancellationPolicy:[],otherPolicy:[]};
		$scope.formErrors = {};

		function splitByCode(str){
			if(str){
				return str.split('-')[0];
			}
		}

		$scope.getPackageDetails = function(){
			 	var packId =  $routeParams.id;
			 	showLoader();
			 	$http.get(configuration.PACKAGE_URL+'?packageId='+packId).then(function success(res){  
				       	hideLoader();
				       	$scope.pack = res.data.data[0] || {};
				       	$scope.getStateList($scope.pack.country);
				       	$scope.getCityByState($scope.pack.state);
				       	setCategories();
				       	$scope.pack.discount 	  = $scope.pack.discountApplied;
				       	$scope.isDiscounted($scope.pack.discount);
				       	$scope.pack.popular       = $scope.pack.popular.toString();
				       	$scope.pack.inclusionList =	$scope.pack.inclusions;
				       	$scope.pack.exclusionList =	$scope.pack.exclusions;
				       	$scope.pack.description = $scope.pack.description[0].package_description;
				       // $scope.pack.description   =	$sce.trustAsHtml($scope.pack.description[0].package_description);
				        $scope.pack.paymentPolicy = $scope.pack.policies[0].paymentPolicy;
				        $scope.pack.cancellationPolicy = $scope.pack.policies[0].cancellationPolicy;
				        $scope.pack.otherPolicy = $scope.pack.policies[0].otherPolicy;
				        $scope.pack.itenary = $scope.pack.itenaries[0].package_itenary;
				}, function errorCallback(err){
	                $scope.errorPop = true;
	                $scope.successPop = false;
	                $scope.errorMsg = err.data.message;
	 			}); 
		 }
		 $scope.getPackageDetails();

 		$scope.addmorehighlights = function(){
			if($scope.pack.highlights.length <= 4 && $scope.pack.highlightsTitle){
				$scope.showHighlightError = false;
				$scope.pack.highlights.push({title:$scope.pack.highlightsTitle});
				$scope.pack.highlightsTitle = '';
			}else{
				$scope.showHighlightError = true;
				$scope.showHighlightErrorMsg = 'Please fill the field.';
			}
			
		}; 
		
		$scope.getInclusions= function(){ 
	      	$http.get(configuration.INCLUSION_URL).then(function success(res){
               $scope.incList = res.data.inclusions;
               setInclusionList($scope.pack.selectedInclusion,$scope.incList);
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getInclusions();

		$scope.getSourceCity = function(){
			$http.get('client/sourceCity.json').then(function(res){
				$scope.sourceCity = res.data;
			})
		};
		$scope.getSourceCity();
		// $scope.sourceCity = [{code:"1", name:"Delhi"},{code:"2", name:"Mumbai"}];

		$scope.pack.selectedInclusion = [];
		$scope.selectInclusion = function(obj){
			$scope.pack.selectedInclusion.push({'i_name':obj.i_name, 'i_code':obj.i_code,'i_icon':obj.i_icon});
			$scope.incList = $scope.incList.filter(function(_p){
				return _p.i_code !== obj.i_code
			});
			$scope._inclusionList = false; 
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


		//$scope.pack.itenary = [{title:'', description:''}];
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
		}
		$scope.removeItenary = function(index){
			$scope.pack.itenary.splice(index,1);
		}

		$scope.getAllCountry= function(){ 
	      	$http.get(configuration.GET_ALL_COUNTRY_URL).then(function success(res){
               $scope.countryList = res.data.country;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getAllCountry();


		$scope.getStateList = function(c_code){
			$http.get(configuration.STATE_URL+"/"+c_code).then(function success(res){
               $scope.stateList = res.data.states;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		};

		$scope.getCityByState = function(s_code){
				$http.get(configuration.CITY_URL+"/"+s_code).then(function success(res){
               $scope.cityList = res.data.cities ;
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

    	$scope.selectedObj ={};  
		$scope.selectedCategories = '';
    	$scope.openCategoryList = function(event){
			$scope.cat_list = true;
			event.stopPropagation();
		};

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

		function setCategories(){ 
			var d = [];
			$scope.pack.category.forEach(function(o){
				var code = splitByCode(o);
				$scope.selectedObj[code] = true; 
				d.push(o.split('-')[1]);
			})
				$scope.selectedCategories = d.join(',') 
			
		};

		function setInclusionList(selectedList, list){ 
			$scope.incList = []
			list.filter(function(obj){
				var matched = selectedList.some(function(ob){
					return ob.i_code == obj.i_code;
				});
				if(!matched) $scope.incList.push(obj);

			})
		}

		window.onclick = function() {
			if ($scope.cat_list) {
				$scope.cat_list = false; 
				$scope.$apply();
			}
		};
// $scope.pack.discount = 'No';
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
        $scope.addPaymentPolicy = function($event, val){
			var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13 && val && $scope.pack.paymentPolicy.length<10) {
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
		    if (keyCode === 13 && val && $scope.pack.cancellationPolicy.length<10) {
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
		    if (keyCode === 13 && val && $scope.pack.otherPolicy.length<10) {
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

		$scope.removeImage = function(id, imgPath, type){ 
		  var updateData = {};
		  showLoader();
		  $http.put(configuration.REMOVE_IMAGE+"/"+id+"?imgPath="+imgPath+"&type="+type, updateData).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               hideLoader();
               if(res.data.status == 1){
               		if(type == 'mainImage') $scope.pack.mainImage = 'null';
               		else if(type == 'discountImg') $scope.pack.discountImage = 'null';
               		else{
               			var indx = $scope.pack.images[0].package_images.indexOf(imgPath);
               			$scope.pack.images[0].package_images.splice(indx,1);
               		}
               } 
               $scope.successMsg = res.data.message; 
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
	    };

	    $scope.pack.mainImageChanged = false;
	    $scope.pack.discountImageChanged = false;
	    $scope.onSelectImage = function(source){
	    	console.log(event.target.files[0])
	    	if(source == 'mainImage') $scope.pack.mainImageChanged = true;
	    	else if(source == 'discountImage') $scope.pack.discountImageChanged = true;
	    }

	    $scope.updatePackage = function(mainImg,files,discountImages){
	    	if($scope.addNewPackageForm.$valid ){ 
			// var formValidation =  checkFormValidation($scope.pack);
			// if(!formValidation.valid){
			// 	$scope.formErrors = formValidation;
			// 	return; 
			// } 
			 var fileArray = [] ;
			if(mainImg) fileArray.push(mainImg);
			if(files) fileArray.push(files);
			if(discountImages) fileArray.push(discountImages); 
			 console.log(JSON.stringify($scope.pack)); 
			 showLoader();
					Upload.upload({
					      url:configuration.PACKAGE_URL+'/'+$scope.pack._id, 
					      arrayKey: '',
					      method:'PUT',
					      data: {data:JSON.stringify($scope.pack),file:fileArray} 
					    }).then(function (resp) {
					    	hideLoader();
					    	$scope.getPackageDetails();
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


	 $scope.resetAll = function(){
		$scope.pack = {};
		$scope.pack = {highlights:[], inclusions:[],itenary:[], inclusionList :[], exclusionList:[]};
		$scope.pack.itenary = [{title:'', description:''}];
		$scope.getInclusions();
		$scope.pack.selectedInclusion = [];
		$scope.addNewPackageForm.$setPristine();
		$scope.addNewPackageForm.$setUntouched();
	}; 
		
	 

});