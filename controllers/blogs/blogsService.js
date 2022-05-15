const { BadRequestResponse, OkResponse } = require("express-http-response");
const db = require("../../db");

const createBlog = (req, res, next) => {
  const { title, paragraph, date, image } = req.body.blog || req.body;
  console.log(req.body);
  if (!title || !paragraph || !image || !date) {
    return next(new BadRequestResponse("Please fill all the fields", 400));
  }
  console.log("called");
  const query = `INSERT INTO blogs (title, paragraph,date, image) VALUES ('${title}', '${paragraph}','${date}', '${image}')`;
  db.query(query, (err, result) => {
    if (err) {
      return next(new BadRequestResponse(err.message, 400));
    }
    return next(new OkResponse("Blog has been published", 200));
  });
};

const getAllBlogs = (req, res, next) => {
  const query = `SELECT * FROM blogs`;
  db.query(query, (err, result) => {
    if (err) {
      return next(new BadRequestResponse(err.message, 400));
    }
    if (result.length) {
      for (const blog of result) {
        blog.image = new Buffer(blog.image, "binary").toString("base64");
      }
    }
    console.log(result);
    return next(new OkResponse(result, 200));
  });
};

const getBlogById = (req, res, next) => {
  const { blogId } = req.params;
  const query = `SELECT * FROM blogs WHERE id = ${blogId}`;
  db.query(query, (err, result) => {
    if (err) {
      return next(new BadRequestResponse(err.message, 400));
    }
    return next(new OkResponse(result, 200));
  });
};

const deleteBlogById = (req, res, next) => {
  const { blogId } = req.params;
  const query = `DELETE FROM blogs WHERE id = ${blogId}`;
  db.query(query, (err, result) => {
    if (err) {
      return next(new BadRequestResponse(err.message, 400));
    }
    return next(new OkResponse("Blog has been deleted", 200));
  });
};

const editBlogById = (req, res, next) => {
  const { blogId } = req.params;
  const { title, paragraph, image } = req.body.blog || req.body;
  const filePath = req.files[0].path;

  if (!title || !paragraph || !image) {
    return next(new BadRequestResponse("Please fill all the fields", 400));
  }

  const query = `UPDATE blogs SET title = '${title}', paragraph = '${paragraph}', image = '${image}' WHERE id = ${blogId}`;
  db.query(query, (err, result) => {
    if (err) {
      return next(new BadRequestResponse(err.message, 400));
    }
    return next(new OkResponse("Blog has been updated", 200));
  });
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  editBlogById,
};
