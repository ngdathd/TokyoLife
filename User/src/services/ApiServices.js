app.service('APIService', function ($http) {
    this.callAPI = function (endpoint, method, data, headers) {
        var config = {
            method: method,
            url: 'http://127.0.0.1:8080/api/' + endpoint,
            data: data,
            headers: headers
        };

        return $http(config);
    };
});
