import asyncHandler from "../middlewares/asyncHandler.js";
import Book from "../models/bookModel.js";

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const fetchBooks = asyncHandler(async (req, res) => {
  try {
    const pageSize = 50;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Book.countDocuments({ ...keyword });
    const books = await Book.find({ ...keyword }).limit(pageSize);

    res.json({
      books,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchBooksAdmin = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Book.countDocuments({ ...keyword });
    const books = await Book.find({ ...keyword });

    res.json({
      books,
      page: 1,
      pages: Math.ceil(count),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const fetchBookById = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      return res.json(book);
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Book not found" });
  }
});

// @desc    Fetch books by author
// @route   GET /api/books/author/:authorId
// @access  Public
const fetchBooksByAuthor = asyncHandler(async (req, res) => {
  try {
    const authorId = req.params.authorId;

    const books = await Book.find({ author: authorId });

    if (books.length === 0) {
      return res.status(404).json({ message: "Books by this author not found" });
    }

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Tác giả không tồn tại!" });
  }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const addBook = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      synopsis,
      author,
      cover,
      demographic,
      publisher,
      number_of_pages,
      price,
      countInStock,
    } = req.body;

    // Validation
    // if (!name || !synopsis || !author || !cover || !demographic || !publisher || !number_of_pages || !price || !countInStock) {
    //   return res.status(400).json({ error: "All fields are required" });
    // }

    const book = new Book({
      name,
      synopsis,
      author,
      cover,
      demographic,
      publisher,
      number_of_pages,
      price,
      countInStock,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBookDetails = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      synopsis,
      author,
      cover,
      demographic,
      publisher,
      number_of_pages,
      price,
      countInStock,
    } = req.body;

    // Validation
    const missingFields = [];
    if (!name) missingFields.push("Tên sách");
    if (!synopsis) missingFields.push("Tóm tắt nội dung");
    if (!author) missingFields.push("Tác giả");
    if (!cover) missingFields.push("Ảnh bìa");
    if (!demographic) missingFields.push("Phân loại");
    if (!publisher) missingFields.push("Nhà xuất bản");
    if (!number_of_pages) missingFields.push("Số trang");
    if (!price) missingFields.push("Giá");
    if (!countInStock) missingFields.push("Số lượng tồn kho");

    if (missingFields.length > 0) {
      const errorMessage = `Trường ${missingFields.join(
        ", "
      )} không được bỏ trống`;
      return res.status(400).json({ error: errorMessage });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        name,
        synopsis,
        author,
        cover,
        demographic,
        publisher,
        number_of_pages,
        price,
        countInStock,
      },
      { new: true }
    );

    if (book) {
      await book.save();
      res.json(book);
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// @desc    Remove a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const removeBook = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.json({ message: "Book removed" });
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
const addBookReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const book = await Book.findById(req.params.id);

    if (book) {
      const alreadyReviewed = book.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Book already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      book.reviews.push(review);

      book.numReviews = book.reviews.length;

      book.rating =
        book.reviews.reduce((acc, item) => item.rating + acc, 0) /
        book.reviews.length;

      await book.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// @desc    Fetch top rated books
// @route   GET /api/books/top
// @access  Public
const fetchTopBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find({}).sort({ rating: -1 }).limit(8);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// @desc    Fetch new books
// @route   GET /api/books/new
// @access  Public
const fetchNewBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find().sort({ _id: -1 }).limit(5);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// @desc    Filter books
// @route   POST /api/books/filter
// @access  Public
const filterBooks = asyncHandler(async (req, res) => {
  try {
    const { author, demographic, price, name, sortOrder } = req.body;

    let args = {};
    if (author) args.author = author;
    if (demographic) args.demographic = demographic;
    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      args.price = {
        $gte: Number(minPrice) || 0,
        $lte: Number(maxPrice) || Infinity,
      };
    }

    let sortOption = {};
    if (sortOrder === "descending_price") {
      sortOption.price = -1; // Sắp xếp theo giá từ cao đến thấp
    } else if (sortOrder === "ascending_price") {
      sortOption.price = 1; // Sắp xếp theo giá từ thấp đến cao
    } else if (sortOrder === "alphabetical") {
      sortOption.name = 1; // Sắp xếp theo tên alphabet
    } else if (sortOrder === "reverse_alphabetical") {
      sortOption.name = -1; // Sắp xếp theo tên alphabet
    } else if (sortOrder === "descending_rating") {
      sortOption.rating = 1;
    } else if (sortOrder === "ascending_rating") {
      sortOption.rating = -1;
    }

    if (name) {
      args.name = { $regex: name, $options: "i" };
    }

    const books = await Book.find(args).sort(sortOption);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
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
};
