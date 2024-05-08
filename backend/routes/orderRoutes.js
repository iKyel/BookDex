import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  getTopSellingBooks
} from "../controllers/orderController.js";

const router = express.Router();

// POST /api/orders - Tạo đơn hàng mới, yêu cầu xác thực
router.route("/").post(authenticate, createOrder);

// GET /api/orders/myorders - Lấy danh sách các đơn hàng của người dùng đang đăng nhập, yêu cầu xác thực
router.route("/myorders").get(authenticate, getMyOrders);

router.route("/top-books").get( getTopSellingBooks);
// GET /api/orders - Lấy danh sách tất cả các đơn hàng, yêu cầu xác thực và quyền quản trị viên
router.route("/").get(authenticate, authorizeAdmin, getOrders);

router.route("/total-orders").get(countTotalOrders);

router.route("/total-sales").get(calculateTotalSales);

router.route("/total-sales-by-date").get(calculateTotalSalesByDate);

// GET /api/orders/:id - Lấy thông tin chi tiết của một đơn hàng dựa trên id, yêu cầu xác thực
router.route("/:id").get(authenticate, getOrderById);

// PUT /api/orders/:id/pay - Cập nhật trạng thái thanh toán của một đơn hàng, yêu cầu xác thực
router.route("/:id/pay").put(authenticate, updateOrderToPaid);

// PUT /api/orders/:id/deliver - Cập nhật trạng thái giao hàng của một đơn hàng, yêu cầu xác thực và quyền quản trị viên
router
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, updateOrderToDelivered);




export default router;
