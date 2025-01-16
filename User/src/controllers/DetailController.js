app.controller("DetailController", function ($scope, APIService, $http, $rootScope, $routeParams, DataServices, APIService) {

    $scope.token = localStorage.getItem('token');
    $scope.headers = {
        'Authorization': 'Bearer ' + $scope.token
    };

    window.scrollTo(0, 0);
    $scope.productId = $routeParams.id;

    DataServices.getProductById($scope.productId)
        .then(function (product) {
            $scope.product = product;
            $rootScope.title = product.title;

            $scope.selectedVariant = product.variants[0];

            $scope.getProductQuantity = function (selectedVariantId) {
                var selectedVariant = $scope.product.variants.find(function (variant) {
                    return variant._id === selectedVariantId;
                });

                return selectedVariant ? (selectedVariant.quantity > 0 ? selectedVariant.quantity : 'Hết hàng') : 'Chọn một loại sản phẩm để xem số lượng';
            };
        })
        .catch(function (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        });

    //filter sản phẩm cùng danh mục với sản phẩm đang xem
    DataServices.getProducts()
        .then(function (products) {
            $scope.relatedProducts = products.filter(function (product) {
                return product.category._id === $scope.product.category._id && product._id !== $scope.product._id;
            });
        })
        .catch(function (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        });

    $scope.quantity = 1;

    $scope.changeQuantity = function (operation) {
        if (operation === 'increase') {
            $scope.quantity++;
        } else if (operation === 'decrease' && $scope.quantity > 1) {
            $scope.quantity--;
        }
    };

    $scope.addToCart = function (product) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        var selectedVariant = product.variants.find(function (variant) {
            return variant._id === $scope.selectedVariant;
        });

        if (!selectedVariant) {
            swal("Lỗi", "Vui lòng chọn một loại sản phẩm", "error");
            return;
        }

        if (selectedVariant.quantity < $scope.quantity) {
            swal({
                title: "Lỗi!",
                text: "Số lượng sản phẩm không đủ",
                icon: "error",
            })
            return;
        }

        var productInCart = cart.find(function (item) {
            return item.productId === product._id && item.variantId === selectedVariant._id;
        });

        if (productInCart) {
            productInCart.quantity += $scope.quantity;
        } else {
            cart.push({
                product: product,
                productId: product._id,
                variantId: selectedVariant._id,
                quantity: $scope.quantity,
            });
        }

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        swal('Thành công!', 'Đã thêm sản phẩm vào giỏ hàng', 'success');
    };

    $scope.rating = 0;
    $scope.content = '';

    $scope.addReview = function () {
        if (!$scope.rating || !$scope.content) {
            swal('Lỗi', 'Vui lòng nhập đầy đủ thông tin', 'error');
            return;
        }

        var reviewData = {
            pid: $scope.product._id,
            star: $scope.rating,
            comment: $scope.content
        };

        APIService.callAPI('product/ratings', "PUT", reviewData, $scope.headers)
            .then(function (response) {
                swal('Thành công', 'Đã thêm đánh giá của bạn', 'success');
                $scope.rating = 0;
                $scope.content = '';

                DataServices.getProductById($scope.productId)
                    .then(function (product) {
                        $scope.product = product;
                    })
                    .catch(function (error) {
                        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
                    });
            })
            .catch(function (error) {
                console.error('Lỗi khi thêm đánh giá:', error);
            });
    };

    //thêm vào whishlist
    $scope.addToWishlist = function (productId) {
        APIService.callAPI("user/addToWishlist", "PUT", { productId: productId }, $scope.headers)
            .then(function (response) {
                swal('Thành công', 'Đã thêm sản phẩm vào danh sách yêu thích', 'success');

                //thêm id sản phẩm vào danh sách yêu thích trong localStorage
                var user = JSON.parse(localStorage.getItem('user'));
                user.wishlist.push(productId);
                localStorage.setItem('user', JSON.stringify(user));


            })
            .catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm vào danh sách yêu thích:', error);
            });
    };


});

