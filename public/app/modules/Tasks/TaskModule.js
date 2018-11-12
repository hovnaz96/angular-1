angular.module('app').controller('TaskIndexController', function ($scope, $rootScope, TaskService) {
    $scope.tasks = [];

    // $scope.getProducts = () => {
    //
    //     ProductService.get({}, (res) => {
    //         $scope.products = res.products;
    //     }, (err) => {
    //
    //     })
    // };
    //
    // $scope.ajaxCall = () => {
    //     $.ajax({
    //         url : '/api/auth/me',
    //         headers : {
    //             Authorization : 'Bearer ' + localStorage.getItem('access_token')
    //         },
    //         type : "POST",
    //         success : (res) => {
    //             console.log(res);
    //             console.log('world');
    //         },
    //         error : (err) => {
    //             console.log(err);
    //         }
    //     });
    //
    //     console.log('hello');
    // }
    //
    // $scope.getProducts();
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


angular.module('app').controller('TaskEditController', function ($scope, $rootScope, TaskService, $stateParams, toastr, $state) {
    $scope.isEdit = +$stateParams.id;
    $scope.name = !+$stateParams.id ? 'Create' : 'Edit';
    $scope.task = {
        description : ''
    };

    // Editor options.
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };


    if(+$stateParams.id) {
        TaskService.show({id : $stateParams.id}, (res) => {
            $scope.task = res.task;
        });
    }



    $scope.saveTask = () => {
        if(!+$stateParams.id) {
            TaskService.store($scope.task, (res) => {
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