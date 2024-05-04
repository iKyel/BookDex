import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createAuthor,
  updateAuthor,
  removeAuthor,
  listAuthors,
  readAuthor,
} from "../controllers/authorController.js";

// Tạo mới tác giả
router.route("/").post(authenticate, authorizeAdmin, createAuthor);

// Cập nhật thông tin tác giả
router.route("/:authorId").put(authenticate, authorizeAdmin, updateAuthor);

// Xóa tác giả
router.route("/:authorId").delete(authenticate, authorizeAdmin, removeAuthor);

// Lấy danh sách tất cả tác giả
router.route("/").get(listAuthors);

// Lấy thông tin chi tiết của một tác giả
router.route("/:id").get(readAuthor);

export default router;