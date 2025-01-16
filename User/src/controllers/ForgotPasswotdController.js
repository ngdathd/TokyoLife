app.controller("ForgotPasswordController", function ($scope, $rootScope, $window, APIService) {
    $rootScope.title = "Quên mật khẩu";
    $window.scrollTo(0, 0);

    $scope.sendMail = function () {
        swal({
            title: "Đang gửi email, vui lòng chờ...",
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

        var userData = {
            email: $scope.email
        };

        APIService.callAPI('user/forgot-password', 'POST', userData)
            .then(function () {
                swal.close();
                swal('Thành công', 'Vui lòng kiểm tra email để đổi mật khẩu', 'success');
            })
            .catch(function (error) {
                swal.close();
                console.log(error);
                swal('Thất bại', error.data.mes, 'error');
            });
    };
});
