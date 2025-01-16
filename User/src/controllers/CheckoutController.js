app.controller("CheckoutController", function ($scope, $rootScope, $timeout, $http, DataServices, $window) {
    $rootScope.title = 'Tokyolife | Thanh Toán Đơn Hàng';
    $window.scrollTo(0, 0);

    if (!localStorage.getItem('cart') || JSON.parse(localStorage.getItem('cart')).length === 0) {
        swal("Thông báo", "Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng", "info");
        $timeout(function () {
            $window.location.href = '';
        }, 2000);
        return;
    }

    $http.get('./src/assets/js/data-location.json')
        .then(function (response) {
            $scope.locations = response.data;
        }
        )
        .catch(function (error) {
            console.error(error);
        });

    $scope.init = function () {
        $scope.discount = parseFloat(localStorage.getItem('discount')) || 0;

        if (localStorage.getItem('token')) {
            $scope.isLogin = true;

            var userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                $scope.userData = userData;

                $http.get('./src/assets/js/data-location.json')
                    .then(function (response) {
                        $scope.locations = response.data;

                        if ($scope.userData.address) {
                            var address = $scope.userData.address.split(', ');
                            $scope.userData.addressDetail = address[0];
                            // Tách thành phố, quận, phường
                            if (address.length > 1) {
                                $scope.selectedProvince = $scope.locations.find(function (location) {
                                    return location.Name === address[address.length - 1];
                                });
                                if ($scope.selectedProvince) {
                                    $scope.selectedDistrict = $scope.selectedProvince.Districts.find(function (district) {
                                        return district.Name === address[address.length - 2];
                                    });
                                    if ($scope.selectedDistrict) {
                                        $scope.selectedWard = $scope.selectedDistrict.Wards.find(function (ward) {
                                            return ward.Name === address[address.length - 3];
                                        });
                                    }
                                }
                            }
                        }
                    })
                    .catch(function (error) {
                        console.error('Lỗi khi gửi yêu cầu API:', error);
                        $scope.apiError = true;
                    });
            } else {
                console.error("Dữ liệu người dùng không tồn tại trong localStorage");
            }
        } else {
            $scope.isLogin = false;
        }

        // Lấy giỏ hàng hiển thị lại
        $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];

        $scope.cart.forEach(function (item, index) {
            var variant = item.product.variants.find(function (variant) {
                return variant._id === item.variantId;
            });

            if (variant) {
                item.variant = variant;
            } else {
                console.error("Không tìm thấy biến thể với variantId:", item.variantId);
            }
        });

        $scope.getCoupon();

        // Tính tổng tiền tạm thời
        $scope.tempPrice = $scope.cart.reduce(function (total, item) {
            return total + item.product.price * item.quantity;
        }, 0);

        // Tính tổng giá cuối cùng
        $scope.totalPrice = $scope.calculateTotalPrice();
    };

    $scope.getCoupon = function () {
        DataServices.getCoupon()
            .then(function (coupon) {
                $scope.coupon = coupon;
            })
            .catch(function (error) {
                console.error('Lỗi khi lấy dữ liệu coupon:', error);
            });
    };

    $scope.applyCoupon = function () {
        if ($window.localStorage.getItem('discount')) {
            swal("Thông báo", "Bạn đã sử dụng mã giảm giá rồi", "info");
            return;
        }

        var couponCode = $scope.couponCode;

        if (!couponCode) {
            swal("Thông báo", "Vui lòng nhập mã giảm giá", "info");
            return;
        }

        if ($scope.coupon.find(function (coupon) {
            return coupon.name === couponCode && new Date(coupon.expiry) < new Date();
        })) {
            swal("Thông báo", "Mã giảm giá đã hết hạn sử dụng", "info");
            return;
        }

        var matchedCoupon = $scope.coupon.find(function (coupon) {
            return coupon.name === couponCode;
        });

        if (matchedCoupon) {
            $scope.discount = $scope.tempPrice * (matchedCoupon.discount / 100);

            $window.localStorage.setItem('discount', $scope.discount);
            swal("Thông báo", "Áp dụng mã giảm giá thành công", "success");

            // Tính lại tổng giá cuối cùng sau khi áp dụng mã giảm giá
            $scope.totalPrice = $scope.calculateTotalPrice();
        } else {
            swal("Thông báo", "Mã giảm giá không hợp lệ", "error");
        }
    };

    $scope.calculateTotalPrice = function () {
        var totalPrice = $scope.tempPrice;

        var discount = parseFloat(localStorage.getItem('discount'));
        if (!isNaN(discount)) {
            totalPrice -= discount;
        }

        return totalPrice;
    };

    $scope.init();


    //hoàn thành đơn hàng

    $scope.completeOrder = function () {
        if (!$scope.userData.addressDetail || !$scope.selectedProvince || !$scope.selectedDistrict || !$scope.selectedWard) {
            swal("Thông báo", "Vui lòng nhập đầy đủ thông tin địa chỉ", "info");
            return;
        }

        var items = $scope.cart.map(function (item) {
            return {
                product: item.product._id,
                variantId: item.variantId,
                quantity: item.quantity
            };
        });

        var order = {
            user: $scope.userData._id || null,
            name: $scope.userData.name,
            mobile: $scope.userData.mobile,
            email: $scope.userData.email,
            items: items,
            shippingAddress: $scope.userData.addressDetail + ', ' + $scope.selectedWard.Name + ', ' + $scope.selectedDistrict.Name + ', ' + $scope.selectedProvince.Name,
            discount: parseFloat(localStorage.getItem('discount')) || 0,
            paymentMethod: $scope.paymentMethod,
            shippingMethod: $scope.shippingMethod,
            note: $scope.note,
        };

        //hiệu ứng loading
        swal({
            title: "Đang xử lý đơn hàng, vui lòng chờ...",
            icon: "info",
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false,
            content: {
                element: "div",
                attributes: {
                    innerHTML: '<i class="fas fa-spinner fa-spin"></i>',
                    className: "custom-loading",
                },
            },
        });

        $http.post('http://127.0.0.1:8080/api/bill', order)
            .then(function (response) {

                //hiển thị thông báo nếu đặt hàng thành công
                swal("Thành công", "Đặt hàng thành công", "success");

                localStorage.removeItem('cart');
                localStorage.removeItem('discount');

                $timeout(function () {
                    $window.location.href = '';
                }, 2000);

            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
                swal("Lỗi", "Đặt hàng thất bại", "error");
            });
    };



});
