app.controller("LoginController", function ($scope, $rootScope, $window, APIService, $timeout) {
    $window.scrollTo(0, 0);

    $rootScope.title = 'Tokyolife | Đăng nhập';

    if ($window.localStorage.getItem('token')) {
        $window.location.replace('index.html');
    }

    $scope.login = function () {
        var userData = {
            email: $scope.email,
            password: $scope.password
        }

        swal({
            title: 'Đang đăng nhập',
            text: 'Vui lòng chờ trong giây lát',
            icon: 'info',
            buttons: false
        });

        APIService.callAPI('user/login', 'POST', userData)
            .then(function (response) {
                if (response.data.userData.isBlocked) {
                    swal('Tài khoản của bạn đã bị khóa', 'Vui lòng liên hệ với quản trị viên để biết thêm chi tiết', 'error');
                    return;
                }

                $window.localStorage.setItem('token', response.data.accessToken);
                $window.localStorage.setItem('name', response.data.userData.name);
                $window.localStorage.setItem('_id', response.data.userData._id);

                var user = JSON.stringify(response.data.userData);
                $window.localStorage.setItem('user', user);

                $scope.isLogin = true

                swal('Đăng nhập thành công', '', 'success');

                $timeout(function () {
                    $window.location.replace('index.html')
                }, 2000);
            })
            .catch(function (error) {
                console.error('Lỗi khi đăng nhập:', error);
                swal('Đăng nhập thất bại', error.data.mes, 'error');
            });
    }

    $scope.showPassword = false;

    $scope.togglePasswordVisibility = function () {
        $scope.showPassword = !$scope.showPassword;
    };

})


