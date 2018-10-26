angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider.state('/',{
            url : '/',
            templateUrl: '/app/modules/Home/views/index.html',
            controller : 'HomeController'
        })
    });