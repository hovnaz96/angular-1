angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider.state('about',{
            url : '/about',
            templateUrl: '/app/modules/About/views/index.html',
            controller : 'AboutController'
        })
    });