app.service('DataServices', function ($http, APIService) {
    var service = this;

    const token = localStorage.getItem('token');

    const headers = {
        'Authorization': 'Bearer ' + token
    };

    service.getAllCategory = function () {
        return APIService.callAPI('category', 'GET', null, null)
            .then(function (response) {
                return response.data.listCategory;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    }

    service.getAllUser = function () {
        return APIService.callAPI('user', 'GET', null, headers)
            .then(function (response) {
                return response.data.users;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    }

    service.getAllProduct = function () {
        return APIService.callAPI('product', 'GET', null, headers)
            .then(function (response) {
                return response.data.products;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    }

    service.getProductById = function (id) {
        return APIService.callAPI('product/' + id, 'GET', null, headers)
            .then(function (response) {
                return response.data.productData;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    }

    service.getAllCoupon = function () {
        return APIService.callAPI('coupon', 'GET', null, headers)
            .then(function (response) {
                return response.data.listCoupon;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    }

    service.getAllOrder = function () {
        return APIService.callAPI('bill', 'GET', null, headers)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    }
})