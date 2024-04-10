app.controller("OrderController", function ($scope, $rootScope, $routeParams, DataServices, APIService) {
    $rootScope.title = "Quản lý đơn hàng";

    const token = localStorage.getItem("token");

    const headers = {
        Authorization: "Bearer " + token
    };

    // Load dữ liệu
    DataServices.getAllOrder().then(function (response) {
        $scope.orders = response;
        $scope.orders.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        if ($routeParams.id) {
            $scope.order = $scope.orders.find(function (order) {
                return order._id === $routeParams.id;
            });

            $scope.order.items.forEach(function (item) {
                item.variant = item.product.variants.find(function (variant) {
                    return variant._id === item.variantId;
                });
            });

            // Tính tổng tiền
            $scope.total = $scope.order.items.reduce(function (total, item) {
                return total + item.product.price * item.quantity;
            }, 0);
        }
    }).catch(function (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    });

    // thay đổi trạng thái đơn hàng
    $scope.updateStatus = function (order) {
        var status = {
            status: order.status
        }

        APIService.callAPI('bill/status/' + order._id, 'PUT', status, headers)
            .then(function (response) {
                swal('Thành công', 'Cập nhật trạng thái đơn hàng thành công', 'success');
            })
            .catch(function (error) {
                console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
            });
    }

    $scope.exportToExcel = function (order) {
        // Tạo một workbook mới
        var wb = XLSX.utils.book_new();
        wb.Props = {
            Title: "Danh sách đơn hàng",
            Subject: "Dữ liệu đơn hàng",
            Author: "Admin",
            CreatedDate: new Date()
        };

        // Tạo một sheet mới cho đơn hàng
        var ws_data = [
            ['Thông tin đơn hàng'],
            ['ID đơn hàng:', order._id],
            ['Tên khách hàng:', order.name],
            ['Email:', order.email],
            ['Địa chỉ:', order.shippingAddress],
            [],
            ['Chi tiết sản phẩm'],
            ['Tên sản phẩm', 'Giá', 'Số lượng', 'Màu sắc', 'Kích cỡ']
        ];

        order.items.forEach(function (item) {
            var product = item.product;
            var variant = product.variants.find(function (variant) {
                return variant._id === item.variantId;
            });

            if (!variant) {
                console.log("Mặt hàng không có thông tin biến thể:", item);
                return;
            }

            console.log("Tên sản phẩm:", product.title);
            console.log("Giá:", product.price);
            console.log("Số lượng:", item.quantity);
            console.log("Màu sắc:", variant.color);
            console.log("Kích cỡ:", variant.size);

            ws_data.push([
                product.title,
                product.price,
                item.quantity,
                variant.color || '',
                variant.size || ''
            ]);
        });

        console.log("Dữ liệu đầu ra:", ws_data);

        var ws = XLSX.utils.aoa_to_sheet(ws_data);

        var sheetName = "ĐH_" + order._id.substring(0, 10);
        wb.SheetNames.push(sheetName);
        wb.Sheets[sheetName] = ws;

        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), sheetName + ".xlsx");
    };

    function convertImgToDataURLviaFileReader(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    $scope.exportToPDF = function (order) {
        var totalAmount = 0; // Biến để lưu trữ tổng tiền
        convertImgToDataURLviaFileReader('./src/assets/img/logo2.png', function (base64Img) {

            var docDefinition = {
                content: [
                    { image: base64Img, width: 200, alignment: 'center', margin: [0, 0, 0, 20] }, // Chèn logo vào tài liệu
                    { text: 'Hoá đơn bán hàng', style: 'header' },
                    { text: 'ID đơn hàng: ' + order._id, style: 'orderInfo' },
                    { text: 'Tên khách hàng: ' + order.name, style: 'orderInfo' },
                    { text: 'Email: ' + order.email, style: 'orderInfo' },
                    { text: 'Địa chỉ: ' + order.shippingAddress, style: 'orderInfo' },
                    { text: 'Chi tiết sản phẩm', style: 'subheader' }
                ],
                styles: {
                    header: { fontSize: 24, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
                    subheader: { fontSize: 18, bold: true, margin: [0, 10, 0, 5] },
                    orderInfo: { fontSize: 14, margin: [0, 5, 0, 5] },
                    productInfo: { fontSize: 12, margin: [0, 5, 0, 5] },
                    totalAmount: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
                    footer: { fontSize: 10, alignment: 'center', margin: [0, 30, 0, 0] }
                },
                footer: function (currentPage, pageCount) {
                    return {
                        text: 'Trang ' + currentPage.toString() + ' của ' + pageCount.toString(),
                        style: 'footer'
                    };
                }
            };


            // Thêm các chi tiết sản phẩm vào tài liệu và tính tổng tiền
            order.items.forEach(function (item) {
                var product = item.product;
                var variant = product.variants.find(function (variant) {
                    return variant._id === item.variantId;
                });

                if (!variant) {
                    console.log("Mặt hàng không có thông tin biến thể:", item);
                    return;
                }

                var totalPrice = product.price * item.quantity; // Tính tổng tiền cho từng sản phẩm
                totalAmount += totalPrice; // Cộng tổng tiền vào biến tổng tiền

                docDefinition.content.push(
                    { text: 'Tên sản phẩm: ' + product.title, style: 'productInfo' },
                    { text: 'Giá: ' + product.price + ' đ', style: 'productInfo' },
                    { text: 'Số lượng: ' + item.quantity, style: 'productInfo' },
                    { text: 'Thành tiền: ' + totalPrice + ' đ', style: 'productInfo' },
                    { text: 'Màu sắc: ' + (variant.color || ''), style: 'productInfo' },
                    { text: 'Kích cỡ: ' + (variant.size || ''), style: 'productInfo' },
                    { text: '\n' } // Thêm một dòng trống sau mỗi chi tiết sản phẩm
                );
            });

            // Thêm tổng tiền vào tài liệu
            docDefinition.content.push(
                { text: 'Tổng tiền: ' + totalAmount + ' đ', style: 'totalAmount' }
            );

            // Xuất PDF
            pdfMake.createPdf(docDefinition).download('HD_' + order._id.substring(0, 10) + '.pdf');
        });
    };
});
