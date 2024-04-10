app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files);
                });

                var preview = document.getElementById('image-preview');
                preview.innerHTML = '';

                var files = element[0].files;
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.type.match('image.*')) {
                        continue;
                    }
                    var reader = new FileReader();
                    reader.onload = (function (theFile) {
                        return function (e) {
                            var img = document.createElement('img');
                            img.src = e.target.result;
                            img.style.maxHeight = '200px';
                            img.style.marginRight = '15px';
                            img.style.marginBottom = '15px';
                            preview.appendChild(img);
                        };
                    })(file);
                    reader.readAsDataURL(file);
                }
            });
        }
    };
}]);
