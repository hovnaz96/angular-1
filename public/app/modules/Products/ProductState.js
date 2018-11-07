angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('products', {
                url: '/products',
                views: {
                    'header@': {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: '/app/modules/Products/views/index.html',
                        controller: 'ProductIndexController'
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
            .state('products.edit', {
                url: '/:id/edit',
                views: {
                    'header@': {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: '/app/modules/Products/views/edit.html',
                        controller: 'ProductEditController'
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

            .state('products.show', {
                url: '/:id/show',
                views: {
                    'header@': {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: '/app/modules/Products/views/show.html',
                        controller: 'ProductShowController'
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


            .state('products.delete', {
                url: '/:id/delete',
                views: {
                    'header@': {
                        templateUrl: '/app/modules/_layouts/Header/views/index.html',
                        controller: 'HeaderController'
                    },
                    'content@': {
                        templateUrl: '/app/modules/Products/views/delete.html',
                        controller: 'ProductDeleteController'
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