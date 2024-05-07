import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// controllers
import {
  fetchBooks,
  fetchBooksAdmin,
  fetchBookById,
  fetchBooksByAuthor,
  addBook,
  updateBookDetails,
  removeBook,
  addBookReview,
  fetchTopBooks,
  fetchNewBooks,
  filterBooks,
} from "../controllers/bookController.js";

const router = express.Router();

// GET /api/books - Lấy danh sách sách với phân trang và tìm kiếm theo tên sách
router.route("/").get(fetchBooks);

// GET /api/books/admin - Lấy danh sách tất cả sách với quyền admin
router.route("/admin").get(authenticate, authorizeAdmin, fetchBooksAdmin);

// GET /api/books/author/:authorId - Lấy danh sách tất cả sách của 1 author
router.route("/author/:authorId").get(fetchBooksByAuthor);

// POST /api/books - Tạo mới sách, yêu cầu xác thực và quyền quản trị viên
router.route("/").post(authenticate, authorizeAdmin, addBook);

// GET /api/books/top - Lấy danh sách sách đánh giá cao nhất
router.route("/top").get(fetchTopBooks);

// GET /api/books/new - Lấy danh sách sách mới nhất
router.route("/new").get(fetchNewBooks);

// POST /api/books/filter - Lọc sách theo tác giả và phân loại
router.route("/filter").post(filterBooks);

// GET /api/books/:id - Lấy thông tin chi tiết của một sách dựa trên id
router.route("/:id").get(fetchBookById);

// PUT /api/books/:id - Cập nhật thông tin của một sách, yêu cầu xác thực và quyền quản trị viên
router.route("/update/:id").put(authenticate, authorizeAdmin, updateBookDetails);

// DELETE /api/books/:id - Xóa một sách, yêu cầu xác thực và quyền quản trị viên
router.route("/:id").delete(authenticate, authorizeAdmin, removeBook);

// POST /api/books/:id/reviews - Tạo mới đánh giá cho một sách, yêu cầu xác thực và kiểm tra id sách hợp lệ
router.route("/:id/reviews").post(authenticate, checkId, addBookReview);

export default router;
