app.controller("UserOrderController", function ($scope, APIService, $window) {
    $window.scrollTo(0, 0);

    $scope.token = localStorage.getItem('token');
    $scope.orders = [];

    var headers = {
        'Authorization': 'Bearer ' + $scope.token
    };

    APIService.callAPI('bill/billUser/getall', 'GET', null, headers)
        .then(function (response) {
            $scope.orders = response.data.data;

            // Lặp qua từng đơn hàng
            $scope.orders.forEach(function (order) {
                order.items.forEach(function (item) {
                    // Tìm biến thể tương ứng với variantId của mỗi mục
                    var variant = item.product.variants.find(function (variant) {
                        return variant._id === item.variantId;
                    });

                    if (variant) {
                        // Gán biến thể vào mục sản phẩm
                        item.variant = variant;
                    } else {
                        console.error("Không tìm thấy biến thể với variantId:", item.variantId);
                    }
                });

                // Tính tổng tiền của đơn hàng
                var totalPrice = order.items.reduce(function (total, item) {
                    return total + item.product.price * item.quantity;
                }, 0);

                // Áp dụng chiết khấu (nếu có)
                order.totalPrice = totalPrice - order.discount;
            });
        })
        .catch(function (error) {
            console.error('Lỗi khi gửi yêu cầu API:', error);
        });

    $scope.showOrderDetail = function (order) {
        $scope.selectedOrder = order;
    };
});
