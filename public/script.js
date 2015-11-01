/**
 * Created by zhenghui on 10/27/15.
 */
var app = angular.module('app',['ngRoute']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/buy', {
                templateUrl: 'buyView.html',
                controller: 'buyCtrl'
            }).
            when('/create', {
                templateUrl: 'createEmployee.html',
                controller: 'createCtrl'
            }).
            when('/info/:employeeId', {
                templateUrl: 'employeeInfo.html',
                controller: 'infoCtrl'
            }).
            when('/report/:managerId', {
                templateUrl: 'directReportList.html',
                controller: 'reportCtrl'
            }).
            when('/', {
                templateUrl: 'mainView.html',
                controller: 'mainCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

app.controller('mainCtrl',function($scope, $location) {

});

app.controller('buyCtrl',function($scope, $location) {
    //$scope.isEmailValid = false;
    //
    //$scope.$watch('email1',function() {$scope.emailCheck();});
    //$scope.$watch('email2',function() {$scope.emailCheck();});
    //
    //$scope.emailCheck = function() {
    //    console.log($scope.isEmailValid);
    //    $scope.isEmailValid = $scope.myForm.email1.$valid && ($scope.email1 == $scope.email2);
    //
    //};

});


