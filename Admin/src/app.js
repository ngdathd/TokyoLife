var app = angular.module('TokyoLife', ["ngRoute", "ngCookies", "angular-jwt", "ui.switchery"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./src/pages/dashboard.html",
            controller: "DashboardController"
        })
        .when('/category', {
            templateUrl: './src/pages/category/category.html',
            controller: 'CategoryController'
        })
        .when('/user', {
            templateUrl: './src/pages/user/user.html',
            controller: 'UserController'
        })
        .when('/user/add', {
            templateUrl: './src/pages/user/add.html',
            controller: 'UserController'
        })
        .when('/user/edit/:id', {
            templateUrl: './src/pages/user/edit.html',
            controller: 'UserController'
        })
        .when('/product', {
            templateUrl: './src/pages/product/product.html',
            controller: 'ProductController'
        })
        .when('/product/add', {
            templateUrl: './src/pages/product/add.html',
            controller: 'ProductController'
        })
        .when('/coupon', {
            templateUrl: './src/pages/coupon/coupon.html',
            controller: 'CouponController'
        })
        .when('/coupon/add', {
            templateUrl: './src/pages/coupon/add.html',
            controller: 'CouponController'
        })
        .when('/order', {
            templateUrl: './src/pages/order/order.html',
            controller: 'OrderController'
        })
        .when('/order/detail/:id', {
            templateUrl: './src/pages/order/detail.html',
            controller: 'OrderController'
        })
        .when('/statistical', {
            templateUrl: './src/pages/statistical/statistical.html',
            controller: 'StatisticalController'
        })
        .when('/feedback', {
            templateUrl: './src/pages/feedback/feedback.html',
            controller: 'FeedbackController'
        })
        .when('/feedback/:id', {
            templateUrl: './src/pages/feedback/feedback-detail.html',
            controller: 'FeedbackController'
        })
})
