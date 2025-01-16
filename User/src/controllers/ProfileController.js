app.controller("ProfileController", function ($scope, $http, $window, APIService) {
    $scope.token = localStorage.getItem('token');
    $window.scrollTo(0, 0);

    var headers = {
        'Authorization': 'Bearer ' + $scope.token
    };

    $http.get('./src/assets/js/data-location.json')
        .then(function (response) {
            $scope.locations = response.data;

            APIService.callAPI('user/getCurrent', 'GET', null, headers)
                .then(function (response) {
                    $scope.userData = response.data.rs;

                    if ($scope.userData.address) {
                        var address = $scope.userData.address.split(', ');
                        $scope.userData.addressDetail = address[0];
                        //tách thành phố, quận, phường
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
                });
        })
        .catch(function (error) {
            console.error(error);
        });



    $scope.updateUserInfo = function () {
        //lấy tỉnh, huyện, xã, địa chỉ, tạo thành chuỗi
        var address = '';

        if ($scope.userData.addressDetail) {
            address = $scope.userData.addressDetail + ', ';
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

        var data = {
            name: $scope.userData.name,
            mobile: $scope.userData.mobile,
            email: $scope.userData.email,
            address: address
        };


        APIService.callAPI('user/current', 'PUT', data, headers)
            .then(function (response) {
                swal("Thành công", "Cập nhật thông tin thành công", "success");
                localStorage.setItem('user', JSON.stringify(response.data.user));
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
                swal("Lỗi", error.data.mes, "error");
            });

    }

});