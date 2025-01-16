app.controller('CategoryController', function ($scope, $rootScope, DataServices, APIService) {
    const token = localStorage.getItem('token');

    const headers = {
        'Authorization': 'Bearer ' + token
    };

    $scope.showAddCategoryForm = false;

    $rootScope.title = 'Danh mục sản phẩm';

    $scope.listCategory = [];

    DataServices.getAllCategory()
        .then(function (listCategory) {
            $scope.listCategory = listCategory;

            $scope.listCategory.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        })
        .catch(function (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        });

    $scope.toggleAddCategoryForm = function () {
        $scope.showAddCategoryForm = !$scope.showAddCategoryForm;
    };

    $scope.addCategory = function () {
        var data = {
            title: $scope.categoryName,
        };

        swal({
            title: 'Đang thêm danh mục...',
            allowOutsideClick: false,
            onOpen: function () {
                swal.showLoading();
            }
        });

        APIService.callAPI('category', 'POST', data, headers)
            .then(function (response) {

                console.log(response.data);
                $scope.listCategory.unshift(response.data.newCategory);

                $scope.listCategory.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                $scope.showAddCategoryForm = false;
                $scope.categoryName = '';

                swal('Thành công', 'Thêm danh mục thành công', 'success');
            })
            .catch(function (error) {
                console.error('Lỗi khi thêm danh mục:', error);
                swal('Lỗi', error.data.mes, 'error');
            });


    }

    $scope.deleteCategory = function (category) {
        $scope.deleteCategory = function (category) {
            swal({
                title: 'Bạn có chắc chắn muốn xóa danh mục này?',
                text: 'Dữ liệu sẽ không thể khôi phục',
                icon: 'warning',
                buttons: {
                    confirm: {
                        text: 'Xóa',
                        value: true,
                        visible: true,
                        className: 'btn-danger',
                        closeModal: true
                    },
                    cancel: {
                        text: 'Hủy',
                        value: null,
                        visible: true,
                        className: 'btn-default',
                        closeModal: true,
                    }
                },
            }).then(function (result) {
                if (result) {
                    APIService.callAPI('category/' + category._id, 'DELETE', null, headers)
                        .then(function (response) {
                            $scope.listCategory = $scope.listCategory.filter(function (item) {
                                return item._id !== category._id;
                            });
                            swal('Thành công', 'Xóa danh mục thành công', 'success');
                        })
                        .catch(function (error) {
                            console.error('Lỗi khi xóa danh mục:', error);
                            swal('Lỗi', error.data.mes, 'error');
                        });
                }
            });
        };

    }

    $scope.showEditForm = false;
    $scope.editingCategory = null;

    $scope.editCategory = function (category) {
        $scope.showEditForm = true;
        $scope.categoryName = category.title;
        $scope.createdAt = category.createdAt;
        $scope.updatedAt = category.updatedAt;
        $scope.editingCategory = category;
    };

    $scope.updateCategorySubmit = function () {
        var data = {
            title: $scope.categoryName,
        };

        var category = $scope.editingCategory; // Sử dụng biến editingCategory ở đây

        APIService.callAPI('category/' + category._id, 'PUT', data, headers)
            .then(function (response) {

                category.title = response.data.updateCategory.title;
                category.updatedAt = response.data.updateCategory.updatedAt;

                $scope.showEditForm = false;
                swal('Thành công', 'Cập nhật danh mục thành công', 'success');
            })
            .catch(function (error) {
                console.error('Lỗi khi cập nhật danh mục:', error);
                swal('Lỗi', error.data.mes, 'error');
            });
    };

});
