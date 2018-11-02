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
                },
                data: {
                    requiresLogin: false
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

            .state('verifyEmail', {
                url : '/verify-email/:token',
                views : {
                    'header' : {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller : 'HeaderController'
                    },
                    'content' : {
                        controller : 'VerifyController'
                    },
                    'footer' : {
                        templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                        controller : 'FooterController'
                    }
                }
            })

            .state('forgotPassword', {
                url : '/forgot-password',
                views : {
                    'header' : {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller : 'HeaderController'
                    },
                    'content' : {
                        templateUrl: '/app/modules/Auth/views/forgot.html',
                        controller : 'ForgotController'
                    },
                    'footer' : {
                        templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                        controller : 'FooterController'
                    }
                }
            })

            .state('resetPassword', {
                url : '/reset-password/:token',
                views : {
                    'header' : {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller : 'HeaderController'
                    },
                    'content' : {
                        templateUrl: '/app/modules/Auth/views/reset.html',
                        controller : 'ResetController'
                    },
                    'footer' : {
                        templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                        controller : 'FooterController'
                    }
                }
            })
    });