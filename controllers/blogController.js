const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find()
    .sort({ created_at: -1 })
    .then((result) => {
      res.json(result);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      if (result === null) {
        res.status(404).send('404 not found.');
      }

      res.json(result);
    });
};

const blog_post = (req, res) => {
  const { body } = req;

  const blog = new Blog({
    title: body.title,
    snippet: body.snippet,
    body: body.body,
  })

  blog.save()
    .then((result) => {
      res.json(result);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(() => res.status(201).json());
};

module.exports = {
  blog_index,
  blog_details,
  blog_post,
  blog_delete,
}