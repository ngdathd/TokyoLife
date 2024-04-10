app.controller("DashboardController", function ($rootScope, $scope, DataServices, APIService, $document) {
    $rootScope.title = "Admin Dashboard";
    $scope.selectedMonth = ''; // Biến để lưu trữ tháng được chọn từ dropdown
    $scope.chartData = {};
    $scope.chartOptions = {};

    $scope.updateChartData = function () {
        var filteredOrders = $scope.filterOrdersByMonth();
        var revenueByMonth = calculateRevenueByMonth(filteredOrders);
        updateChartData(revenueByMonth);
    };

    function calculateRevenueByMonth(orders) {
        var revenueByMonth = {};

        orders.forEach(function (order) {
            // Chỉ tính doanh thu từ đơn hàng đã giao hàng
            if (order.status === 'Đã Giao Hàng') {
                var month = new Date(order.createdAt).getMonth() + 1;
                if (!revenueByMonth[month]) {
                    revenueByMonth[month] = 0;
                }
                var orderTotal = 0;
                order.items.forEach(function (item) {
                    orderTotal += item.product.price * item.quantity;
                });
                orderTotal -= order.discount;
                revenueByMonth[month] += orderTotal;

            }
        });

        return revenueByMonth;
    }

    // Lọc đơn hàng theo tháng được chọn
    $scope.filterOrdersByMonth = function () {
        if ($scope.selectedMonth === '') {
            return $scope.orders; // Không có tháng nào được chọn, trả về tất cả các đơn hàng
        } else {
            return $scope.orders.filter(function (order) {
                var orderMonth = new Date(order.createdAt).getMonth() + 1;
                return orderMonth.toString() === $scope.selectedMonth;
            });
        }
    };

    // Hàm cập nhật dữ liệu cho biểu đồ
    function updateChartData(revenueByMonth) {
        $scope.chartData = {
            labels: Object.keys(revenueByMonth).map(function (month) { return 'Tháng ' + month; }),
            datasets: [{
                label: "Doanh Thu",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                data: Object.values(revenueByMonth)
            }]
        };

        // Tạo biểu đồ mới
        createChart();
    }

    // Tạo biểu đồ
    function createChart() {
        var ctx = document.getElementById('myChart').getContext('2d');
        if ($scope.myChart) {
            $scope.myChart.destroy();
        }
        $scope.myChart = new Chart(ctx, {
            type: 'bar',
            data: $scope.chartData
        });
    }

    // Lấy danh sách đơn hàng
    DataServices.getAllOrder().then(function (response) {
        $scope.orders = response;
        $scope.months = getDistinctMonths(response);
        $scope.waitingOrders = $scope.orders.filter(function (order) {
            return order.status === 'Chờ Xác Nhận';
        });

        //tính tổng tiền đơn hàng đã giao, giá trị này cố định không thay đổi
        $scope.totalRevenue1 = 0;
        $scope.orders.forEach(function (order) {
            if (order.status === 'Đã Giao Hàng') {
                var orderTotal = 0;
                order.items.forEach(function (item) {
                    orderTotal += item.product.price * item.quantity;
                });
                orderTotal -= order.discount;
                $scope.totalRevenue1 += orderTotal;
            }
        });

        // Cập nhật dữ liệu cho biểu đồ mặc định
        $scope.updateChartData();
    });

    // Hàm lấy danh sách các tháng từ dữ liệu đơn hàng
    function getDistinctMonths(orders) {
        var distinctMonths = [];
        orders.forEach(function (order) {
            var month = new Date(order.createdAt).getMonth() + 1;
            if (distinctMonths.indexOf(month.toString()) === -1) {
                distinctMonths.push(month.toString());
            }
        });
        return distinctMonths;
    }

    // Hàm thay đổi trạng thái đơn hàng
    $scope.changeStatus = function (order) {
        var status = {
            status: 'Đã Xác Nhận'
        };

        APIService.callAPI('bill/status/' + order._id, 'PUT', status)
            .then(function (response) {
                swal('Thành công', 'Cập nhật trạng thái đơn hàng thành công', 'success');
                $scope.waitingOrders = $scope.waitingOrders.filter(function (item) {
                    return item._id !== order._id;
                });

                $scope.months = getDistinctMonths($scope.orders);
                $scope.updateChartData();
            })
            .catch(function (error) {
                console.log('Có lỗi xảy ra:', error);
            });
    };

});
