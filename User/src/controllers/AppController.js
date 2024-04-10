app.controller('AppController', function ($rootScope, $window, $timeout, jwtHelper, DataServices) {
    $window.scrollTo(0, 0);
    DataServices.getCategories()
        .then(function (categories) {
            $rootScope.categories = categories;
        })
        .catch(function (error) {
            console.error('Lỗi khi lấy dữ liệu từ server:', error);
        });

    //lấy token từ localStorage
    $rootScope.token = localStorage.getItem('token');

    if ($rootScope.token) {
        $rootScope.decoded = jwtHelper.decodeToken($rootScope.token);

        if ($rootScope.decoded) {
            $rootScope.isLogin = true;
        } else {
            $rootScope.isLogin = false;
        }
    } else {
        $rootScope.isLogin = false;
    }

    $rootScope.name = localStorage.getItem('name');

    //đăng xuất
    $rootScope.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('_id');
        localStorage.removeItem('user');

        swal('Đăng xuất thành công', '', 'success');

        $rootScope.isLogin = false;

        $timeout(function () {
            window.location.href = '/';
        }, 1000);
    }

    //nếu token hết hạn thì đăng xuất
    if ($rootScope.decoded && jwtHelper.isTokenExpired($rootScope.token)) {
        swal('Phiên đăng nhập hết hạn', 'Vui lòng đăng nhập lại', 'error').then(function () {
            $rootScope.logout();
        });
    }
});

app.directive("stickyScroll", function ($window) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            angular.element($window).bind("scroll", function () {
                if (this.pageYOffset >= 100) {
                    scope.isSticky = true;
                } else {
                    scope.isSticky = false;
                }
                scope.$apply();
            });

            scope.$watch("isSticky", function (newValue) {
                if (newValue) {
                    element.addClass("sticky");
                } else {
                    element.removeClass("sticky");
                }
            });
        }
    };
});