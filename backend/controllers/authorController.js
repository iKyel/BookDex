import Author from "../models/authorModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createAuthor = asyncHandler(async (req, res) => {
  try {
    const { name, biography, whereToFind } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingAuthor = await Author.findOne({ name });

    if (existingAuthor) {
      return res.json({ error: "Author already exists" });
    }

    const author = await new Author({ name, biography, whereToFind }).save();
    res.json(author);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateAuthor = asyncHandler(async (req, res) => {
    try {
      const { authorId } = req.params;
      const updates = req.body;
  
      const author = await Author.findOne({ _id: authorId });
  
      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }
  
      // Cập nhật các trường có trong req.body
      Object.keys(updates).forEach(key => {
        author[key] = updates[key];
      });
  
      const updatedAuthor = await author.save();
      res.json(updatedAuthor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

const removeAuthor = asyncHandler(async (req, res) => {
  try {
    const removed = await Author.findByIdAndDelete(req.params.authorId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listAuthors = asyncHandler(async (req, res) => {
  try {
    const authors = await Author.find({});
    res.json(authors);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readAuthor = asyncHandler(async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.params.id });
    res.json(author);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export {
  createAuthor,
  updateAuthor,
  removeAuthor,
  listAuthors,
  readAuthor,
};