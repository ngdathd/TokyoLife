app.controller("ResetPasswordController", function ($scope, $routeParams, $location, $window, $timeout, APIService) {
    $window.scrollTo(0, 0);

    $scope.reset = function () {
        var userData = {
            password: $scope.password,
            token: $routeParams.token
        }

        swal({
            title: 'Đang xử lý',
            text: 'Vui lòng chờ trong giây lát',
            icon: 'info',
            buttons: false
        });

        APIService.callAPI('user/reset-password', 'PUT', userData)
            .then(function (response) {
                console.log(response)
                swal('Thành công', 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại', 'success');

                $timeout(function () {
                    $location.path('/login');
                }, 1000);
            })
            .catch(function (error) {
                console.error('Lỗi', error);

                swal('Thất bại', error.data.mes, 'error');
            })
    }
});