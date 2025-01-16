var app = angular.module('TokyoLife', ["ngRoute", "ngCookies", "angular-jwt"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./src/pages/home.html?" + Math.random(),
            controller: "HomeController"
        })
        .when("/product", {
            templateUrl: "./src/pages/product.html?" + Math.random(),
            controller: "ProductController"
        })
        .when("/register", {
            templateUrl: "./src/pages/register.html?" + Math.random(),
            controller: "RegisterController"
        })
        .when("/login", {
            templateUrl: "./src/pages/login.html?" + Math.random(),
            controller: "LoginController"
        })
        .when("/password/forgot", {
            templateUrl: "./src/pages/forgot-password.html?" + Math.random(),
            controller: "ForgotPasswordController"
        })
        .when("/password/reset/:token", {
            templateUrl: "./src/pages/reset-password.html?" + Math.random(),
            controller: "ResetPasswordController"
        })
        .when("/profile", {
            templateUrl: "./src/pages/profile.html?" + Math.random(),
            controller: "ProfileController"
        })
        .when("/detail/:id", {
            templateUrl: "./src/pages/product-detail.html?" + Math.random(),
            controller: "DetailController"
        })
        .when("/cart", {
            templateUrl: "./src/pages/cart.html?" + Math.random(),
            controller: "CartController"
        })
        .when("/checkout", {
            templateUrl: "./src/pages/checkout.html?" + Math.random(),
            controller: "CheckoutController"
        })
        .when("/lookup", {
            templateUrl: "./src/pages/look-up-order.html?" + Math.random(),
            controller: "LookupController"
        })
        .when("/profile/order", {
            templateUrl: "./src/pages/user-order.html?" + Math.random(),
            controller: "UserOrderController"
        })
        .when("/profile/wishlist", {
            templateUrl: "./src/pages/wishlist.html?" + Math.random(),
            controller: "UserWishlistController"
        })
});