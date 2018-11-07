angular.module('app').controller('ProductIndexController', function ($scope, $rootScope, ProductService) {
    $scope.products = [];

    $scope.getProducts = () => {

        ProductService.get({}, (res) => {
            $scope.products = res.products;
        }, (err) => {

        })
    };

    $scope.getProducts();
});

angular.module('app').controller('ProductShowController', function ($scope, $rootScope, ProductService, $stateParams) {
    $scope.product = [];

    $scope.getProduct = () => {
        ProductService.show({id : $stateParams.id}, (res) => {
            $scope.product = res.product;
        })
    };

    $scope.getProduct();
});

angular.module('app').controller('ProductDeleteController', function ($scope, $rootScope, ProductService, $stateParams, toastr, $state) {
    $scope.yes = () => {
        ProductService.delete({id : $stateParams.id}, (res) => {
            toastr.success('Successfully deleted.');
            $state.go('products');
        })
    }
});


angular.module('app').controller('ProductEditController', function ($scope, $rootScope, ProductService, $stateParams, toastr, $state) {
    $scope.isEdit = +$stateParams.id;
    $scope.name = !+$stateParams.id? 'Create' : 'Edit';
    $scope.product = {};

    if(+$stateParams.id) {
        ProductService.show({id : $stateParams.id}, (res) => {
            $scope.product = res.product;
        });
    }

    $scope.saveProduct = () => {
        if(!+$stateParams.id) {
            ProductService.store($scope.product, (res) => {
                toastr.success('Successfully created');
                $state.go('products');
            }, (err) => {
                let errorsArr = [];
                if(err.status === 422) {
                    Object.keys(err.data.errors).map((item) => {
                        errorsArr.push(err.data.errors[item].join('\n'));
                    })
                }

                toastr.error(errorsArr.join('\n'));
            })
        } else {
            ProductService.update({id : $stateParams.id}, $scope.product, (res) => {
                toastr.success('Successfully updated');
                $state.go('products');
            }, (err) => {
                let errorsArr = [];
                if(err.status === 422) {
                    Object.keys(err.data.errors).map((item) => {
                        errorsArr.push(err.data.errors[item].join('\n'));
                    })
                }

                toastr.error(errorsArr.join('\n'));
            })
        }
    }
});