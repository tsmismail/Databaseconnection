var app = angular.module('todoApp',[]);

app.controller('todoController',function($scope,$http){

	$http.get('/api/todos').success(function(data){	
		$scope.displayData = data;
	}).error(function(data){
		console.log('error',data);
	})
	
	$scope.onAdd = function(){
		var body = {
			text: $scope.enterData
		}		
		$http.post('/ismail', body).success(function(data){
						$scope.enterData = '';
						$scope.displayData = data;
		}).error(function(data){
			console.log('error',data);
		})
	}
	
	$scope.onDelete = function(id){
	console.log('i am in onDelete');
		$http.delete('/api/todos/'+id).success(function(data){
			$scope.displayData = data;
		}).error(function(data){
			console.log('error',data);
		})
	}
});