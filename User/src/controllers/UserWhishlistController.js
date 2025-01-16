app.controller('UserWishlistController', function ($scope, $window, APIService, DataServices) {
    $window.scrollTo(0, 0);

    //lấy wishlist từ localStorage
    $scope.user = JSON.parse(localStorage.getItem('user'));
    var headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }

    $scope.wishlist = [];

    console.log($scope.user.wishlist);
    //lấy danh sách sản phẩm yêu thích theo id trong wishlist
    $scope.wishlist = $scope.user.wishlist;

    $scope.productsWishlist = [];

    $scope.wishlist.forEach(function (product) {
        DataServices.getProductById(product)
            .then(function (product) {
                $scope.productsWishlist.push(product);
            })
            .catch(function (error) {
                console.error('Lỗi khi lấy dữ liệu từ server:', error);
            });
    });


    $scope.removeWishlist = function (productId) {
        //xóa sản phẩm khỏi wishlist
        $scope.user.wishlist = $scope.user.wishlist.filter(function (product) {
            return product !== productId;
        });

        localStorage.setItem('user', JSON.stringify($scope.user));

        var data = {
            productId: productId
        }

        APIService.callAPI('user/deleteFromWishlist/', 'PUT', data, headers)
            .then(function (response) {
                console.log(response.data);
                swal('Thành công', 'Đã xóa sản phẩm khỏi danh sách yêu thích', 'success')
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    }
});