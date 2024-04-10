app.controller("UserController", function ($scope, $http, $rootScope, $routeParams, DataServices, APIService) {
    $rootScope.title = "Quản lý người dùng";

    const token = localStorage.getItem("token");

    const headers = {
        Authorization: "Bearer " + token
    };

    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;
    $scope.users = [];
    $scope.pages = [];

    // Load dữ liệu
    DataServices.getAllUser().then(function (users) {
        $scope.users = users;
        $scope.users.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        updateDisplayedUsers();
    }).catch(function (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    });

    // Hàm cập nhật danh sách người dùng hiển thị
    function updateDisplayedUsers() {
        var startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endIndex = startIndex + $scope.itemsPerPage;
        $scope.displayedUsers = $scope.users.slice(startIndex, endIndex);

        // Tính toán số trang
        $scope.pages = [];
        var totalPages = Math.ceil($scope.users.length / $scope.itemsPerPage);
        for (var i = 1; i <= totalPages; i++) {
            $scope.pages.push(i);
        }
    }

    // Hàm cập nhật trang hiện tại
    $scope.setCurrentPage = function (page) {
        $scope.currentPage = page;
        updateDisplayedUsers();
    };


    $scope.changeStatus = function (user) {
        var data = {
            isBlocked: user.isBlocked
        };

        // Gửi yêu cầu API PUT
        APIService.callAPI("user/admin/update/" + user._id, "PUT", data, headers)
            .then(function (response) {
                swal('Thành công', 'Cập nhật trạng thái thành công', 'success');
            })
            .catch(function (error) {
                console.error("Lỗi khi cập nhật trạng thái:", error);
                swal('Thất bại', 'Cập nhật trạng thái thất bại', 'error');
            });


    };

    //load tỉnh thành 

    $http.get('../../src/assets/js/data-location.json')
        .then(function (response) {
            $scope.locations = response.data;
        })
        .catch(function (error) {
            console.error('Lỗi khi gửi yêu cầu API:', error);
        });

    //thêm mới user
    $scope.addUser = function () {
        //địa chỉ có thể null
        if ($scope.selectedProvince == null) {
            $scope.selectedProvince = {
                Name: ""
            };
        }
        if ($scope.selectedDistrict == null) {
            $scope.selectedDistrict = {
                Name: ""
            };
        }
        if ($scope.selectedWard == null) {
            $scope.selectedWard = {
                Name: ""
            };
        }

        if ($scope.addressDetail == null) {
            $scope.addressDetail = "";
        }

        var userData = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password,
            mobile: $scope.mobile || "",
            address: $scope.addressDetail + ', ' + $scope.selectedWard.Name + ', ' + $scope.selectedDistrict.Name + ', ' + $scope.selectedProvince.Name || "",
            role: $scope.role || "user"

        }

        APIService.callAPI("user/admin/create", "POST", userData, headers)
            .then(function (response) {
                swal('Thành công', 'Thêm mới người dùng thành công', 'success');
                $scope.users.push(response.data);
                updateDisplayedUsers();
            })
            .catch(function (error) {
                console.error("Lỗi khi thêm mới user:", error);
                swal('Thất bại', error.data.mes, 'error');
            });
    }

    //xoá
    $scope.deleteUser = function (user) {
        swal({
            title: 'Bạn có chắc chắn muốn xóa người dùng này?',
            text: "Dữ liệu bị xóa sẽ không thể khôi phục!",
            icon: 'warning',
            buttons: {
                cancel: {
                    text: 'Hủy',
                    value: false,
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: 'Xóa',
                    value: true,
                    visible: true,
                    closeModal: true,
                }
            },
            dangerMode: true,
        }).then((result) => {
            if (result) {
                APIService.callAPI("user/?_id=" + user._id, "DELETE", null, headers)
                    .then(function (response) {
                        swal('Thành công', 'Xóa người dùng thành công', 'success');
                        var index = $scope.users.indexOf(user);
                        $scope.users.splice(index, 1);
                        updateDisplayedUsers();
                    })
                    .catch(function (error) {
                        console.error("Lỗi khi xóa user:", error);
                        swal('Thất bại', error.data.mes, 'error');
                    });
            }
        });
    }

    //gọi api lấy thông tin user
    if ($routeParams.id) {
        APIService.callAPI("user/admin/get/" + $routeParams.id, "GET", null, headers)
            .then(function (response) {
                $scope.userRes = response.data.user;
                $http.get('./src/assets/js/data-location.json')
                    .then(function (response) {
                        $scope.locations = response.data;

                        if ($scope.userRes.address) {
                            var address = $scope.userRes.address.split(', ');
                            $scope.userRes.addressDetail = address[0];
                            // Tách thành phố, quận, phường
                            if (address.length > 1) {
                                $scope.selectedProvince = $scope.locations.find(function (location) {
                                    return location.Name === address[address.length - 1];
                                });
                                if ($scope.selectedProvince) {
                                    $scope.selectedDistrict = $scope.selectedProvince.Districts.find(function (district) {
                                        return district.Name === address[address.length - 2];
                                    });
                                    if ($scope.selectedDistrict) {
                                        $scope.selectedWard = $scope.selectedDistrict.Wards.find(function (ward) {
                                            return ward.Name === address[address.length - 3];
                                        });
                                    }
                                }
                            }
                        }
                    })
                    .catch(function (error) {
                        console.error('Lỗi khi gửi yêu cầu API:', error);
                        $scope.apiError = true;
                    });
            })
            .catch(function (error) {
            });
    }

    //cập nhật user
    $scope.editSubmit = function () {

        var address = '';

        if ($scope.userRes.addressDetail) {
            address = $scope.userRes.addressDetail + ', ';
        }
        if ($scope.selectedWard) {
            address += $scope.selectedWard.Name + ', ';
        }
        if ($scope.selectedDistrict) {
            address += $scope.selectedDistrict.Name + ', ';
        }
        if ($scope.selectedProvince) {
            address += $scope.selectedProvince.Name;
        }

        var userData = {
            name: $scope.userRes.name,
            email: $scope.userRes.email,
            mobile: $scope.userRes.mobile || "",
            address: address || "",
            role: $scope.userRes.role
        }

        APIService.callAPI("user/admin/update/" + $routeParams.id, "PUT", userData, headers)
            .then(function (response) {
                swal('Thành công', 'Cập nhật thông tin thành công', 'success');
                $scope.userRes = response.data.user;
                $scope.userRes.addressDetail = address.split(', ')[0];
            })
            .catch(function (error) {
                console.error("Lỗi khi cập nhật user:", error);
                swal('Thất bại', error.data.mes, 'error');
            });
    };
});
