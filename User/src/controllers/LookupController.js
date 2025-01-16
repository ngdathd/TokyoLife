app.controller("LookupController", function ($scope, $rootScope, DataServices) {
    $rootScope.title = 'Tokyolife | Tra cứu đơn hàng';

    $scope.lockup = function () {
        if ($scope.idBill) {
            DataServices.getBill($scope.idBill)
                .then(function (bill) {
                    $scope.bill = bill;
                })
                .catch(function (error) {
                    console.error('Lỗi khi tra cứu đơn hàng:', error);
                });
        }
    }
});
