angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider.state('/', {
            url : '/',
            views : {
                'header' : {
                    templateUrl: '/app/modules/_layouts/Header/views/index.html',
                    controller : 'HeaderController'
                },
                'content' : {
                    templateUrl: '/app/modules/Home/views/index.html',
                    controller : 'HomeController'
                },
                'footer' : {
                    templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                    controller : 'FooterController'
                }
            }
        })
    });