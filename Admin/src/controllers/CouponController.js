app.controller("CouponController", function ($rootScope, $location, $timeout, $scope, DataServices, APIService) {
    $rootScope.title = "Quản Lý Mã Giảm Giá";

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token,
    };

    DataServices.getAllCoupon().then(function (response) {
        $scope.listCoupon = response;
    });

    $scope.addCoupon = function () {
        swal({
            title: "Đang tạo mã giảm giá",
            text: "Vui lòng chờ",
            icon: "info",
            button: false,

        })
        const data = {
            name: $scope.name,
            discount: $scope.discount,
            expiry: $scope.expiry
        }
        APIService.callAPI('coupon', 'POST', data, headers).then(function (response) {
            console.log(response);
            swal('Thành công', 'Tạo mã giảm giá thành công', 'success');

            //chuyển hướng về trang danh sách mã giảm giá
            $timeout(function () {
                $location.path('/coupon');
            }, 1000);


            DataServices.getAllCoupon().then(function (response) {
                $scope.listCoupon = response;
            });
        });
    }

    $scope.deleteCoupon = function (id) {
        swal({
            title: "Bạn có chắc chắn muốn xóa mã giảm giá này?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    APIService.callAPI('coupon/' + id, 'DELETE', null, headers).then(function (response) {
                        swal('Thành công', 'Xóa mã giảm giá thành công', 'success');
                        DataServices.getAllCoupon().then(function (response) {
                            $scope.listCoupon = response;
                        });
                    });
                }
            });
    }
});