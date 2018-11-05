angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider.state('settings', {
            url : '/settings',
            views : {
                'header' : {
                    templateUrl: '/app/modules/_layouts/Header/views/index.html',
                    controller : 'HeaderController'
                },
                'content' : {
                    templateUrl: '/app/modules/User/views/settings.html',
                    controller : 'UserSettingsController'
                },
                'footer' : {
                    templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                    controller : 'FooterController'
                }
            }
        })
    });