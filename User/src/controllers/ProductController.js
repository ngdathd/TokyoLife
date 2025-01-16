app.controller("ProductController", function ($scope, $window, $rootScope, DataServices, $routeParams) {
    $rootScope.title = 'Tokyolife | Sản phẩm';
    $window.scrollTo(0, 0);

    $scope.loadingProduct = true;
    $scope.productsPerPage = 12;
    $scope.displayedProducts = [];

    //măc định sắp xếp theo sản phẩm mới nhất
    $scope.selectedSortType = 'newest';
    function loadProducts() {
        DataServices.getProducts()
            .then(function (products) {
                $scope.allProducts = products;

                console.log($scope.allProducts.length)
                $scope.applyFiltersAndSort();

                $scope.loadingProduct = false;
            }).catch(function (error) {
                console.error("Error loading products:", error);
                $scope.loadingProduct = false;
            });
    }

    // Hàm để áp dụng bộ lọc và sắp xếp
    $scope.applyFiltersAndSort = function () {
        if ($routeParams.category_id) {
            $scope.products = $scope.allProducts.filter(function (product) {
                return product.category._id === $routeParams.category_id;
            });
            var matchedCategory = $scope.categories.find(function (category) {
                return category._id === $routeParams.category_id;
            });
            $scope.categoryName = matchedCategory ? matchedCategory.title : 'Tất cả sản phẩm';
        } else {
            $scope.products = $scope.allProducts;
            $scope.categoryName = 'Tất cả sản phẩm';
        }
        $scope.sortProducts($scope.selectedSortType);
        $scope.displayedProducts = $scope.products.slice(0, $scope.productsPerPage);
    };

    // Hàm để sắp xếp sản phẩm
    $scope.sortProducts = function (sortType) {
        switch (sortType) {
            case 'newest':
                $scope.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'nameAsc':
                $scope.products.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'nameDesc':
                $scope.products.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'priceDesc':
                $scope.products.sort((a, b) => {
                    const priceA = a.sale > 0 ? a.price * (1 - a.sale / 100) : a.price;
                    const priceB = b.sale > 0 ? b.price * (1 - b.sale / 100) : b.price;
                    return priceB - priceA;
                });
                break;
            case 'priceAsc':
                $scope.products.sort((a, b) => {
                    const priceA = a.sale > 0 ? a.price * (1 - a.sale / 100) : a.price;
                    const priceB = b.sale > 0 ? b.price * (1 - b.sale / 100) : b.price;
                    return priceA - priceB;
                });
                break;
            default:
                break;
        }
    };


    // Hàm xử lý Xem thêm
    $scope.loadMore = function () {
        // Lấy vị trí bắt đầu của trang tiếp theo
        var nextPageStart = $scope.displayedProducts.length;

        // Lấy vị trí kết thúc của trang tiếp theo
        var nextPageEnd = nextPageStart + $scope.productsPerPage;

        // Nếu trang tiếp theo còn sản phẩm thì hiển thị
        if (nextPageStart < $scope.products.length) {
            // Thêm sản phẩm vào danh sách hiển thị 
            $scope.displayedProducts = $scope.displayedProducts.concat($scope.products.slice(nextPageStart, nextPageEnd));
        }
    };

    loadProducts();
});
