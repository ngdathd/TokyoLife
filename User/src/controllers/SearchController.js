app.controller("SearchController", function ($scope, $http, APIService) {
    $scope.searchResults = [];
    $scope.search = function () {
        if ($scope.searchText) {
            // $http.get('https://localhost:3002/api/product?title=' + $scope.searchText)
            APIService.callAPI('product?title=' + $scope.searchText, 'GET')
                .then(function (response) {
                    $scope.searchResults = response.data.products;
                })
                .catch(function (error) {
                    console.error('Error fetching search results:', error);
                    $scope.searchResults = [];
                });
        } else {
            $scope.searchResults = [];
        }
    };
});
