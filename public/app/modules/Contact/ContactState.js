angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider.state('contact',{
            url : '/contact',
            views : {
                'header' : {
                    templateUrl: '/app/modules/_layouts/Header/views/index.html',
                    controller : 'HeaderController'
                },
                'content' : {
                    templateUrl: '/app/modules/Contact/views/index.html',
                    controller : 'ContactController'
                },
                'footer' : {
                    templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                    controller : 'FooterController'
                }
            }
        })
    });