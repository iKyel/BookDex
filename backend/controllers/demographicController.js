import Demographic from "../models/demographicModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createDemographic = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Tên là bắt buộc" });
    }

    const existingDemographic = await Demographic.findOne({ name });

    if (existingDemographic) {
      return res.json({ error: "Đã tồn tại" });
    }

    const demographic = await new Demographic({ name }).save();
    res.json(demographic);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateDemographic = asyncHandler(async (req, res) => {
  try {
    const { demographicId } = req.params;
    const updates = req.body;

    const demographic = await Demographic.findOne({ _id: demographicId });

    if (!demographic) {
      return res.status(404).json({ error: "Không tìm thấy" });
    }

    // Cập nhật các trường có trong req.body
    Object.keys(updates).forEach(key => {
      demographic[key] = updates[key];
    });

    const updatedDemographic = await demographic.save();
    res.json(updatedDemographic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
});

const removeDemographic = asyncHandler(async (req, res) => {
  try {
    const removed = await Demographic.findByIdAndDelete(req.params.demographicId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
});

const listDemographic = asyncHandler(async (req, res) => {
  try {
    const all = await Demographic.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readDemographic = asyncHandler(async (req, res) => {
  try {
    const demographic = await Demographic.findOne({ _id: req.params.id });
    res.json(demographic);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export {
  createDemographic,
  updateDemographic,
  removeDemographic,
  listDemographic,
  readDemographic,
};
