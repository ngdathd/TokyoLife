app.service('DataServices', function (APIService) {
    var service = this;

    service.getProducts = function () {
        return APIService.callAPI('product', 'GET', null, null)
            .then(function (response) {
                return response.data.products;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    };

    service.getCategories = function () {
        return APIService.callAPI('category', 'GET', null, null)
            .then(function (response) {
                return response.data.listCategory;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    };

    service.getProductById = function (productId) {
        return APIService.callAPI('product/' + productId, 'GET', null, null)
            .then(function (response) {
                return response.data.productData;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    };

    service.getCoupon = function () {
        return APIService.callAPI('coupon', 'GET', null, null)
            .then(function (response) {
                return response.data.listCoupon;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    }

    service.getBill = function (billId) {
        return APIService.callAPI('bill/' + billId, 'GET', null, null)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            });
    }

});
