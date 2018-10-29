angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url : '/login',
                views : {
                    'header' : {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller : 'HeaderController'
                    },
                    'content' : {
                        templateUrl: '/app/modules/Auth/views/login.html',
                        controller : 'LoginController'
                    },
                    'footer' : {
                        templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                        controller : 'FooterController'
                    }
                }
            })

            .state('register', {
                url : '/register',
                views : {
                    'header' : {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller : 'HeaderController'
                    },
                    'content' : {
                        templateUrl: '/app/modules/Auth/views/register.html',
                        controller : 'RegisterController'
                    },
                    'footer' : {
                        templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                        controller : 'FooterController'
                    }
                }
            })
    });