app.service('APIService', function ($http) {
    this.callAPI = function (endpoint, method, data, headers) {
        var config = {
            method: method,
            url: 'https://app-server.lafutavn.store/api/' + endpoint,
            data: data,
            headers: headers
        };

        return $http(config);
    };
});
