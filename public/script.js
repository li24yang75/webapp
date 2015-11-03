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
            when('/news', {
                templateUrl: 'news.html',
                controller: 'newsCtrl'
            }).
            when('/community', {
                templateUrl: 'community.html',
                controller: 'communityCtrl'
            }).
            when('/tutorial', {
                templateUrl: 'tutorial.html',
                controller: 'tutorialCtrl'
            }).
            when('/download', {
                templateUrl: 'download.html',
                controller: 'downloadCtrl'
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

});

app.controller('newsCtrl',function($scope, $location) {

});


app.controller('communityCtrl',function($scope, $location) {

});

app.controller('tutorialCtrl',function($scope, $location) {

});

app.controller('downloadCtrl',function($scope, $location) {

});