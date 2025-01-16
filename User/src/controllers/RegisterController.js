app.controller('RegisterController', function ($scope, $window, $location, $timeout, APIService) {
    $window.scrollTo(0, 0);

    if ($window.localStorage.getItem('token')) {
        $window.location.replace('index.html');
    }

    $scope.register = function () {
        var userData = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password
        };

        swal({
            title: 'Đang đăng ký tài khoản',
            text: 'Vui lòng chờ trong giây lát',
            icon: 'info',
            buttons: false
        });

        APIService.callAPI('user/register', 'POST', userData)
            .then(function (response) {
                swal('Đăng ký thành công', '', 'success');

                $timeout(function () {
                    $location.path('/login');
                }, 1000);
            })
            .catch(function (error) {
                console.error('Lỗi khi đăng ký:', error);
                swal('Đăng ký thất bại', error.data.mes, 'error');
            });
    }

    //ẩn hiện password
    $scope.showPassword = false;

    $scope.togglePasswordVisibility = function () {
        $scope.showPassword = !$scope.showPassword;
    };

});