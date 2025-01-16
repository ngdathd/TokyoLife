!function () {
    angular.module("angular-jwt", ["angular-jwt.interceptor", "angular-jwt.jwt"]),
        angular.module("angular-jwt.interceptor", [])
            .provider("jwtInterceptor", function () {
                this.authHeader = "Authorization",
                    this.authPrefix = "Bearer ",
                    this.tokenGetter = function () { return null };
                var e = this;
                this.$get = ["$q", "$injector", "$rootScope", function (t, r, n) {
                    return {
                        request: function (n) {
                            if (n.skipAuthorization) return n;
                            if (n.headers = n.headers || {}, n.headers[e.authHeader]) return n;
                            var a = t.when(r.invoke(e.tokenGetter, this, { config: n }));
                            return a.then(function (t) { return t && (n.headers[e.authHeader] = e.authPrefix + t), n })
                        },
                        responseError: function (e) { return 401 === e.status && n.$broadcast("unauthenticated", e), t.reject(e) }
                    }
                }]
            }),
        angular.module("angular-jwt.jwt", [])
            .service("jwtHelper", function () {
                this.urlBase64Decode = function (str) {
                    var output = str.replace(/-/g, '+').replace(/_/g, '/');
                    switch (output.length % 4) {
                        case 0: break;
                        case 2: output += '=='; break;
                        case 3: output += '='; break;
                        default: throw 'Invalid base64url string';
                    }
                    return decodeURIComponent(atob(output).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                };
                this.decodeToken = function (token) {
                    var parts = token.split('.');
                    if (parts.length !== 3) {
                        throw new Error('JWT must have 3 parts');
                    }
                    var decoded = this.urlBase64Decode(parts[1]);
                    if (!decoded) {
                        throw new Error('Cannot decode the token');
                    }
                    return JSON.parse(decoded);
                };
                this.getTokenExpirationDate = function (token) {
                    var decoded = this.decodeToken(token);
                    if (!decoded.exp) {
                        return null;
                    }
                    var date = new Date(0);
                    date.setUTCSeconds(decoded.exp);
                    return date;
                };
                this.isTokenExpired = function (token) {
                    var expirationDate = this.getTokenExpirationDate(token);
                    return expirationDate ? expirationDate.valueOf() < new Date().valueOf() : true;
                };
            })
}();
