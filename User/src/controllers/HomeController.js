app.controller("HomeController", function ($scope, $rootScope, $window, DataServices) {
    $rootScope.title = 'Tokyolife | Trang Chủ';
    $scope.loading = true;
    $window.scrollTo(0, 0);

    // Lấy dữ liệu sản phẩm
    DataServices.getProducts().then(function (products) {
        $scope.products = products;

        $scope.flashSaleProducts = products.filter(function (product) {
            return product.isFlashSale;
        }).slice().sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        $scope.newProducts = products.slice().sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        $scope.viewProducts = products.slice().sort(function (a, b) {
            return b.numberView - a.numberView;
        });
        $scope.loading = false;
    });

    // Lấy danh mục sản phẩm
    DataServices.getCategories().then(function (categories) {
        $scope.categories = categories;
    });

    //show chi tiết sản phẩm
    $scope.showDetail = function (product) {
        $scope.selectedProduct = product;

        $scope.selectedVariant = $scope.selectedProduct.variants[0]; // Sửa đổi ở đây

        $scope.getProductQuantity = function (selectedVariantId) {
            var selectedVariant = $scope.selectedProduct.variants.find(function (variant) {
                return variant._id === selectedVariantId;
            });

            return selectedVariant ? (selectedVariant.quantity > 0 ? selectedVariant.quantity : 'Hết hàng') : 'Chọn một loại sản phẩm để xem số lượng';
        };
    }

    $scope.quantity = 1;
    // Thay đổi số lượng sản phẩm
    $scope.changeQuantity = function (operation) {
        if (operation === 'increase') {
            $scope.quantity++;
        } else if (operation === 'decrease' && $scope.quantity > 1) {
            $scope.quantity--;
        }
    };

    //

    // Thêm sản phẩm vào giỏ hàng
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


});
