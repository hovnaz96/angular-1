angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider.state('about',{
            url : '/about',
            views : {
                'header' : {
                    templateUrl: '/app/modules/_layouts/Header/views/index.html',
                    controller : 'HeaderController'
                },
                'content' : {
                    templateUrl: '/app/modules/About/views/index.html',
                    controller : 'AboutController'
                },
                'footer' : {
                    templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                    controller : 'FooterController'
                }
            }

        })
    });