app.controller("CartController", function ($scope, $rootScope, $timeout, $window, DataServices) {
    $window.scrollTo(0, 0);

    $rootScope.title = 'Tokyolife | Giỏ hàng';

    if ($window.localStorage.getItem('discount')) {
        $scope.discount = parseFloat($window.localStorage.getItem('discount'));
    }

    // Load giỏ hàng khi trang được tải
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];

    if ($scope.cart && $scope.cart.length > 0) {
        $scope.cart.forEach(function (item, index) {
            var variant = item.product.variants.find(function (variant) {
                return variant._id === item.variantId;
            });

            if (variant) {
                item.variant = variant;
            } else {
                console.error("Không tìm thấy biến thể với variantId:", item.variantId);
            }
        })
    } else {
        $scope.cart = [];
        swal("Thông báo", "Giỏ hàng của bạn đang trống", "info")
        $timeout(function () {
            $window.location.href = '/';
        }, 1000);
    }

    // Thay đổi số lượng
    $scope.changeQuantity = function (operation, $index) {
        if (operation === 'increase') {
            $scope.cart[$index].quantity++;
        } else if (operation === 'decrease' && $scope.cart[$index].quantity > 1) {
            $scope.cart[$index].quantity--;
        }

        $scope.updateTotalPrice();
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    };

    // Tính tổng tiền
    $scope.getTotalPrice = function () {
        var totalPrice = 0;

        $scope.cart.forEach(function (item) {
            totalPrice += item.product.price * item.quantity;
        });

        return totalPrice;
    };

    $scope.updateTotalPrice = function () {
        $scope.totalPrice = $scope.getTotalPrice();
    };

    $scope.updateTotalPrice();


    // Xoá 1 sản phẩm khỏi giỏ hàng
    $scope.removeProduct = function ($index) {
        swal({
            title: "Bạn có chắc chắn muốn xoá sản phẩm này?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $scope.cart.splice($index, 1);
                    localStorage.setItem('cart', JSON.stringify($scope.cart));
                    swal("Sản phẩm đã được xoá!", {
                        icon: "success",
                    });

                    $scope.$apply();
                } else {
                    swal("Sản phẩm chưa được xoá!");
                }
            });
    };

    // Xoá hết sản phẩm khỏi giỏ hàng
    $scope.removeAllProduct = function () {
        swal({
            title: "Bạn có chắc chắn muốn xoá tất cả sản phẩm?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    localStorage.removeItem('cart');
                    $scope.cart = [];
                    swal("Tất cả sản phẩm đã được xoá!", {
                        icon: "success",
                    });

                    $scope.$apply();
                } else {
                    swal("Tất cả sản phẩm chưa được xoá!");
                }
            });
    };
});
