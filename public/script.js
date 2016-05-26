/**
 * Created by zhenghui on 10/27/15.
 */
var app = angular.module('app',['ngRoute']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/buy', {
                templateUrl: 'buyView1.html',
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
            when('/wwe', {
                templateUrl: 'wweView.html',
                controller: 'wweCtrl'
            }).
            when('/', {
                templateUrl: 'home.html',
                controller: 'homeCtrl'
            }).
            when('/nba', {
                templateUrl: 'nbaView.html',
                controller: 'nbaCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

app.controller('nbaCtrl',function($scope, $location) {

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

app.controller('wweCtrl',function($scope, $location) {

});

app.controller('homeCtrl',function($scope, $location) {

});