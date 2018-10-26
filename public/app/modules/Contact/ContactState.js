angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider.state('contact',{
            url : '/contact',
            templateUrl: '/app/modules/Contact/views/index.html',
            controller : 'ContactController'
        })
    });