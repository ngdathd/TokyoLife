app.controller("LoginController", function ($scope, APIService, $location, $timeout, jwtHelper, $window) {
    if ($window.localStorage.getItem('token')) {
        $window.location.href = 'index.html';
    }

    $scope.login = function () {
        swal({
            title: "Đang xử lý",
            text: "Vui lòng chờ trong giây lát...",
            icon: "info",
            button: false
        });

        var data = {
            email: $scope.email,
            password: $scope.password
        };

        APIService.callAPI("user/login", "POST", data, null)
            .then(function (response) {
                var decoded = jwtHelper.decodeToken(response.data.accessToken);

                if (decoded.role === "admin") {
                    $window.localStorage.setItem('token', response.data.accessToken);
                    $window.localStorage.setItem('name', response.data.userData.name);
                    $window.localStorage.setItem('_id', response.data.userData._id);

                    var user = JSON.stringify(response.data.userData);
                    $window.localStorage.setItem('user', user);

                    $window.localStorage.setItem('role', decoded.role);

                    swal('Đăng nhập thành công', '', 'success');

                    $timeout(function () {
                        $window.location.href = 'index.html';
                    }, 1000);
                } else {
                    swal('Đăng nhập thất bại', 'Bạn không có quyền truy cập nội dung này', 'error');
                }
            })
            .catch(function (error) {
                swal('Đăng nhập thất bại', error.data.mes, 'error');
            });
    }

});