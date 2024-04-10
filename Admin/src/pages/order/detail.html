<div class="content">
    <div class="shadow-sm px-5 py-3 shadow-lg">
        <h5 class="mb-0 fw-semibold">Quản Lý Đơn Hàng</h4>
    </div>

    <div class="px-5">
        <div class="row my-5">
            <!-- <div id="data-export" class="d-flex flex-column gap-3">

                <div class="d-flex justify-content-between">
                    <h5 class="fw-semibold">Đơn Hàng {{ order._id }}</h5>
                    <div>
                        <button class="btn btn-outline-danger" ng-click="exportToExcel(order)">
                            Xuất Tệp Excel <i class="fa-solid fa-download"></i>
                        </button>
                        <button class="btn btn-outline-danger" ng-click="exportToPDF(order)">
                            Xuất Tệp PDF <i class="fa-solid fa-download"></i>
                        </button>
                    </div>
                </div>
                <div class="alert alert-success" role="alert" ng-if="order.status == 'Đã Giao Hàng'">
                    Đơn hàng đã giao thành công
                </div>

                <div class="alert alert-danger" role="alert" ng-if="order.status == 'Đã Hủy'">
                    Đơn hàng đã bị hủy
                </div>

                <div class="alert alert-warning" role="alert" ng-if="order.status == 'Chờ Xác Nhận'">
                    Đơn hàng chờ xác nhận
                </div>

                <div class="alert alert-info" role="alert" ng-if="order.status == 'Đang Vận Chuyển'">
                    Đơn hàng đang vận chuyển
                </div>

                <div class="alert alert-primary" role="alert" ng-if="order.status == 'Đã Xác Nhận'">
                    Đơn hàng được đã xác nhận, đang chờ vận chuyển
                </div>

                <table class="table table-borderless">
                    <tbody>
                        <div class="">
                            <tr>
                                <th colspan="2">
                                    Thông Tin Đơn Hàng
                                </th>
                            </tr>
                            <tr>
                                <td>Mã Đơn Hàng</td>
                                <td>{{ order._id }}</td>
                            </tr>
                            <tr>
                                <td>Người Đặt</td>
                                <td>{{ order.name }}</td>
                            </tr>
                            <tr>
                                <td>Ngày Đặt Hàng</td>
                                <td>{{ order.createdAt | date: "HH:mm:ss dd-MM-yyyy" }}</td>
                            </tr>
                            <tr>
                                <td>Trạng Thái</td>
                                <td>
                                    <select class="form-select w-25" ng-model="order.status"
                                        ng-change="updateStatus(order)">
                                        <option value="Chờ Xác Nhận">Chờ Xác Nhận</option>
                                        <option value="Đã Xác Nhận">Đã Xác Nhận</option>
                                        <option value="Đang Vận Chuyển">Đang Vận Chuyển</option>
                                        <option value="Đã Giao Hàng">Đã Giao Hàng</option>
                                        <option value="Đã Hủy">Đã Hủy</option>
                                    </select>
                                </td>
                            </tr>
                        </div>
                        <div class="">

                            <tr>
                                <th colspan="2">
                                    Thông Tin Người Nhận
                                </th>
                            </tr>

                            <tr>
                                <td>Họ Tên</td>
                                <td>{{ order.name }}</td>
                            </tr>
                            <tr>
                                <td>Số Điện Thoại</td>
                                <td>{{ order.mobile }}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{{ order.email }}</td>
                            </tr>
                            <tr>
                                <td>Địa Chỉ</td>
                                <td>{{ order.shippingAddress }}</td>
                            </tr>
                        </div>
                        <div class="">

                            <tr>
                                <th colspan="2">
                                    Thông Tin Thanh Toán
                                </th>
                            </tr>

                            <tr>
                                <td>Phương Thức Thanh Toán</td>
                                <td>{{ order.paymentMethod }}</td>
                            </tr>
                            <tr>
                                <td>Trạng Thái Thanh Toán</td>
                                <td>{{ order.status === "Đã Giao Hàng" ? "Đã Thanh Toán" : "Chưa Thanh Toán" }}</td>
                            </tr>
                        </div>
                        <div class="">

                            <tr>
                                <th colspan="2">
                                    Thông Tin Vận Chuyển
                                </th>
                            </tr>

                            <tr>
                                <td>Đơn Vị Vận Chuyển</td>
                                <td>{{ order.shippingMethod }}</td>
                            </tr>
                        </div>
                    </tbody>
                </table>


                <h5 class="fw-semibold">Danh Sách Sản Phẩm</h5>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Thành Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="item in order.items">
                            <td>
                                <img src="{{ item.product.images[0] }}" alt="{{ item.product.title }}" class="img-fluid"
                                    style="width: 50px;">
                            </td>
                            <td>{{ item.product.title }}
                                <small class="text-muted d-block">Kích Thước: {{ item.variant.size }}</small>
                                <small class="text-muted d-block">Màu Sắc: {{ item.variant.color }}</small>
                            </td>
                            <td>
                                <p class="fw-bold mb-0">
                                    {{ item.product.sale > 0 ? ((item.product.price - (item.product.price *
                                    item.product.sale / 100)) | currency: "": 0) + "đ" : (item.product.price |
                                    currency:
                                    "": 0) + "đ" }}
                                </p>
                            </td>
                            <td>{{ item.quantity }}</td>
                            <td>
                                <p class="fw-bold mb-0">
                                    {{ item.product.sale > 0 ? ((item.product.price - (item.product.price *
                                    item.product.sale / 100)) * item.quantity | currency: "": 0) + "đ" :
                                    (item.product.price *
                                    item.quantity | currency: "": 0) + "đ" }}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="text-end">Tổng Tiền</td>
                            <td>
                                <p class="fw-bold mb-0">{{ total | currency: "": 0 }}đ</p>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div> -->

            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="invoice-title">
                                    <h4 class="float-end font-size-15">{{ order._id }}
                                        <span class="badge bg-success font-size-12 ms-2"
                                            ng-if="order.status == 'Đã Giao Hàng'">
                                            Đã Giao Hàng
                                        </span>

                                        <span class="badge bg-danger font-size-12 ms-2"
                                            ng-if="order.status == 'Đã Hủy'">
                                            Đã Hủy
                                        </span>

                                        <span class="badge bg-warning font-size-12 ms-2"
                                            ng-if="order.status == 'Chờ Xác Nhận'">
                                            Chờ Xác Nhận
                                        </span>

                                        <span class="badge bg-info font-size-12 ms-2"
                                            ng-if="order.status == 'Đang Vận Chuyển'">
                                            Đang Vận Chuyển
                                        </span>

                                        <span class="badge bg-primary font-size-12 ms-2"
                                            ng-if="order.status == 'Đã Xác Nhận'">
                                            Đã Xác Nhận, Đang Chờ Vận Chuyển
                                        </span>
                                    </h4>
                                    <div class="mb-4">
                                        <h2 class="mb-1 text-muted">Thông Tin Đơn Hàng</h2>
                                    </div>
                                </div>

                                <hr class="my-4">

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="text-muted">
                                            <h5 class="font-size-16 mb-3">Thông Tin Khách Hàng</h5>
                                            <h5 class="font-size-15 mb-2">{{ order.name }}</h5>
                                            <p class="mb-1">{{ order.shippingAddress }}</p>
                                            <p class="mb-1">{{ order.email }}</p>
                                            <p>{{ order.mobile }}</p>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                    <div class="col-sm-6">
                                        <div class="text-muted text-sm-end">
                                            <div>
                                                <h5 class="font-size-15 mb-1">Phương Thức Thanh Toán</h5>
                                                <p>{{ order.paymentMethod }}</p>
                                            </div>
                                            <div class="mt-4">
                                                <h5 class="font-size-15 mb-1">Phương Thức Vận Chuyển</h5>
                                                <p>{{ order.shippingMethod }}</p>
                                            </div>
                                            <div class="mt-4">
                                                <h5 class="font-size-15 mb-1">Ngày Đặt Hàng</h5>
                                                <p>{{ order.createdAt | date: "HH:mm:ss dd-MM-yyyy" }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                </div>
                                <!-- end row -->

                                <div class="ms-1 row my-4">
                                    <h5 class="">Thay Đổi Trạng Thái Đơn Hàng</h5>
                                    <select class="form-select w-25 text-start" ng-model="order.status"
                                        ng-change="updateStatus(order)">
                                        <option value="Chờ Xác Nhận">Chờ Xác Nhận</option>
                                        <option value="Đã Xác Nhận">Đã Xác Nhận</option>
                                        <option value="Đang Vận Chuyển">Đang Vận Chuyển</option>
                                        <option value="Đã Giao Hàng">Đã Giao Hàng</option>
                                        <option value="Đã Hủy">Đã Hủy</option>
                                    </select>
                                </div>

                                <div class="py-2">
                                    <h5 class="font-size-15">Thông Tin Sản Phẩm</h5>

                                    <div class="table-responsive">
                                        <table class="table align-middle table-nowrap table-centered mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Ảnh</th>
                                                    <th>Tên Sản Phẩm</th>
                                                    <th>Giá</th>
                                                    <th>Số Lượng</th>
                                                    <th>Thành Tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="item in order.items">
                                                    <td>
                                                        <img src="{{ item.product.images[0] }}"
                                                            alt="{{ item.product.title }}" class="img-fluid"
                                                            style="width: 50px;">
                                                    </td>
                                                    <td>{{ item.product.title }}
                                                        <small class="text-muted d-block">Kích Thước: {{
                                                            item.variant.size }}</small>
                                                        <small class="text-muted d-block">Màu Sắc: {{ item.variant.color
                                                            }}</small>
                                                    </td>
                                                    <td>
                                                        <p class="fw-bold mb-0">
                                                            {{ item.product.sale > 0 ? ((item.product.price -
                                                            (item.product.price *
                                                            item.product.sale / 100)) | currency: "": 0) + "đ" :
                                                            (item.product.price |
                                                            currency:
                                                            "": 0) + "đ" }}
                                                        </p>
                                                    </td>
                                                    <td>{{ item.quantity }}</td>
                                                    <td>
                                                        <p class="fw-bold mb-0">
                                                            {{ item.product.sale > 0 ? ((item.product.price -
                                                            (item.product.price *
                                                            item.product.sale / 100)) * item.quantity | currency: "": 0)
                                                            + "đ" :
                                                            (item.product.price *
                                                            item.quantity | currency: "": 0) + "đ" }}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="4" class="text-end">Tổng Tiền</td>
                                                    <td>
                                                        <p class="fw-bold mb-0">{{ total | currency: "": 0 }}đ</p>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table><!-- end table -->
                                    </div><!-- end table responsive -->
                                    <div class="d-print-none mt-4">
                                        <div class="float-end">
                                            <div>
                                                <button class="btn btn-outline-danger" ng-click="exportToExcel(order)">
                                                    Xuất Tệp Excel <i class="fa-solid fa-download"></i>
                                                </button>

                                                <button class="btn btn-outline-dark" ng-click="exportToPDF(order)">
                                                    Xuất Tệp PDF <i class="fa-solid fa-download"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->
                </div>
            </div>

        </div>
    </div>