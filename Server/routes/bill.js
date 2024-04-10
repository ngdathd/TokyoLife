const router = require('express').Router();
const billController = require('../controllers/bill');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/', billController.createNewBill);
router.get('/', billController.getAllBill);
router.put("/:id", billController.updateBill);
router.put("/status/:id", billController.updateStatusBill);
router.get("/:id", billController.getBill);

//lấy tât cả đơn hàng của user
router.get("/billUser/getall", verifyAccessToken, billController.getBillByUser);

module.exports = router