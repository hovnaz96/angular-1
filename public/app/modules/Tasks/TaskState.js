angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('tasks', {
                url: '/tasks',
                views: {
                    'header@': {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: '/app/modules/Tasks/views/index.html',
                        controller: 'TaskIndexController'
                    },
                    'footer@': {
                        templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                        controller: 'FooterController'
                    }
                },
                data: {
                    requiresLogin: true
                }

            })
            .state('tasks.edit', {
                url: '/:id/edit',
                views: {
                    'header@': {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: '/app/modules/Tasks/views/edit.html',
                        controller: 'TaskEditController'
                    },
                    'footer@': {
                        templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                        controller: 'FooterController'
                    }
                },
                data: {
                    requiresLogin: true
                }

            })

            .state('tasks.show', {
                url: '/:id/show',
                views: {
                    'header@': {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: '/app/modules/Tasks/views/show.html',
                        controller: 'TaskShowController'
                    },
                    'footer@': {
                        templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                        controller: 'FooterController'
                    }
                },
                data: {
                    requiresLogin: true
                }

            })


            .state('tasks.delete', {
                url: '/:id/delete',
                views: {
                    'header@': {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: '/app/modules/Tasks/views/delete.html',
                        controller: 'TaskDeleteController'
                    },
                    'footer@': {
                        templateUrl: '/app/modules/_layouts/Footer/views/index.html',
                        controller: 'FooterController'
                    }
                },
                data: {
                    requiresLogin: true
                }

            })
    });