app.controller("AppController", function ($rootScope, APIService, $scope, $timeout, $window, jwtHelper, DataServices) {
    //lấy token
    const token = $window.localStorage.getItem('token');
    const headers = {
        Authorization: 'Bearer ' + token
    }

    $rootScope.isLogin = false;

    if ($window.localStorage.getItem('token')) {
        var decode = jwtHelper.decodeToken($window.localStorage.getItem('token'));
        if (decode.role !== 'admin') {
            $window.location.href = 'login.html';
        } else {
            $rootScope.isLogin = true;
        }
        console.log(decode);
    } else {
        $window.location.href = 'login.html';
    }


    $rootScope.logout = function () {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('name');
        $window.localStorage.removeItem('_id');
        $window.localStorage.removeItem('user');

        swal('Đăng xuất thành công', '', 'success');

        $timeout(function () {
            $window.location.href = 'login.html';
        }, 1000);
    }
});

